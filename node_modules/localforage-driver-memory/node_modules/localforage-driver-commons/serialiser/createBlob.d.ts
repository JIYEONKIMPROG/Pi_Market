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
export declare function createBlob(parts: any, properties: any): Blob;
