"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftStorageUpload = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const metaplex_auth_1 = require("@nftstorage/metaplex-auth");
const nft_storage_1 = require("nft.storage");
async function nftStorageUpload(image, animation, manifestBuffer, walletKeyPair, env, nftStorageKey) {
    // If we have an API token, use the default NFTStorage client.
    // Otherwise, use NFTStorageMetaplexor, which uses a signature
    // from the wallet key to authenticate.
    // See https://github.com/nftstorage/metaplex-auth for details.
    const client = nftStorageKey
        ? new nft_storage_1.NFTStorage({ token: nftStorageKey })
        : metaplex_auth_1.NFTStorageMetaplexor.withSecretKey(walletKeyPair.secretKey, {
            solanaCluster: env,
            mintingAgent: 'metaplex/candy-machine-v2-cli',
        });
    async function uploadMedia(media) {
        try {
            const readStream = fs_1.default.createReadStream(media);
            loglevel_1.default.info(`Media Upload ${media}`);
            // @ts-ignore - the Blob type expects a web ReadableStream, but also works with node Streams.
            const cid = await client.storeBlob({ stream: () => readStream });
            return `https://${cid}.ipfs.dweb.link`;
        }
        catch (err) {
            loglevel_1.default.debug(err);
            throw new Error(`Media upload error: ${err}`);
        }
    }
    async function uploadMetadata(manifestJson, imageUrl, animationUrl) {
        try {
            loglevel_1.default.info('Upload metadata');
            const metaData = Buffer.from(JSON.stringify(manifestJson));
            const cid = await client.storeBlob(new nft_storage_1.Blob([metaData]));
            const link = `https://${cid}.ipfs.dweb.link`;
            loglevel_1.default.info('Upload end');
            if (animationUrl) {
                loglevel_1.default.debug([link, imageUrl, animationUrl]);
            }
            else {
                loglevel_1.default.debug([link, imageUrl]);
            }
            return [link, imageUrl, animationUrl];
        }
        catch (err) {
            loglevel_1.default.debug(err);
            throw new Error(`Metadata upload error: ${err}`);
        }
    }
    // Copied from ipfsUpload
    const imageUrl = `${await uploadMedia(image)}?ext=${path_1.default
        .extname(image)
        .replace('.', '')}`;
    const animationUrl = animation
        ? `${await uploadMedia(animation)}?ext=${path_1.default
            .extname(animation)
            .replace('.', '')}`
        : undefined;
    const manifestJson = JSON.parse(manifestBuffer.toString('utf8'));
    manifestJson.image = imageUrl;
    if (animation) {
        manifestJson.animation_url = animationUrl;
    }
    return uploadMetadata(manifestJson, imageUrl, animationUrl);
}
exports.nftStorageUpload = nftStorageUpload;
