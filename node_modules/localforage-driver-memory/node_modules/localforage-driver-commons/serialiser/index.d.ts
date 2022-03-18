export declare function stringToBuffer(serializedString: string): ArrayBuffer;
/**
 * Converts a buffer to a string to store, serialized, in the backend
 * storage library.
 */
export declare function bufferToString(buffer: ArrayBufferLike): string;
/**
 * Serialize a value, afterwards executing a callback (which usually
 * instructs the `setItem()` callback/promise to be executed). This is how
 * we store binary data with localStorage.
 * @param value
 * @param callback
 */
export declare function serialize(this: any, value: any, callback: any): void;
/**
 * Deserialize data we've inserted into a value column/field. We place
 * special markers into our strings to mark them as encoded; this isn't
 * as nice as a meta field, but it's the only sane thing we can do whilst
 * keeping localStorage support intact.
 *
 * Oftentimes this will just deserialize JSON content, but if we have a
 * special marker (SERIALIZED_MARKER, defined above), we will extract
 * some kind of arraybuffer/binary data/typed array out of the string.
 * @param value
 */
export declare function deserialize(value: string): any;
