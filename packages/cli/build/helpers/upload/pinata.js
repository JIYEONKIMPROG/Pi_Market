"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinataUpload = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
async function sleep(ms) {
    console.log('waiting');
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function uploadMedia(media, jwt) {
    const data = new form_data_1.default();
    data.append('file', fs_1.default.createReadStream(media));
    const res = await (0, node_fetch_1.default)(`https://api.pinata.cloud/pinning/pinFileToIPFS`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        method: 'POST',
        body: data,
    });
    const json = await res.json();
    return json.IpfsHash;
}
async function pinataUpload(image, animation, manifestBuffer, jwt, gateway) {
    const gatewayUrl = gateway ? gateway : `https://ipfs.io`;
    const manifestJson = JSON.parse(manifestBuffer.toString('utf8')); //JSON.parse(fs.readFileSync(manifestBuffer, 'utf-8'));
    const imageCid = await uploadMedia(image, jwt);
    loglevel_1.default.info('uploaded image: ', `${gatewayUrl}/ipfs/${imageCid}`);
    await sleep(500);
    let animationCid = undefined;
    let animationUrl = undefined;
    if (animation) {
        animationCid = await uploadMedia(animation, jwt);
        loglevel_1.default.info('uploaded image: ', `${gatewayUrl}/ipfs/${animationCid}`);
    }
    const mediaUrl = `${gatewayUrl}/ipfs/${imageCid}`;
    manifestJson.image = mediaUrl;
    manifestJson.properties.files = manifestJson.properties.files.map(f => {
        return { ...f, uri: mediaUrl };
    });
    if (animationCid) {
        animationUrl = `${gatewayUrl}/ipfs/${animationCid}`;
        manifestJson.animation_url = animationUrl;
    }
    fs_1.default.writeFileSync('tempJson.json', JSON.stringify(manifestJson));
    const metadataCid = await uploadMedia('tempJson.json', jwt);
    await sleep(500);
    const link = `${gatewayUrl}/ipfs/${metadataCid}`;
    loglevel_1.default.info('uploaded manifest: ', link);
    return [link, mediaUrl, animationUrl];
}
exports.pinataUpload = pinataUpload;
