"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstracts constructing a Blob object, so it also works in older
 * browsers that don't support the native Blob constructor. (i.e.
 * old QtWebKit versions, at least).
 * Abstracts constructing a Blob object, so it also works in older
 * browsers that don't support the native Blob constructor. (i.e.
 * old QtWebKit versions, at least).
 *
 * @param parts
 * @param properties
 */
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    }
    catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        //tslint:disable-next-line:variable-name
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder
            : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder
                : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder
                    : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}
exports.createBlob = createBlob;
//# sourceMappingURL=createBlob.js.map