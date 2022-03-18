import { PathLike } from "fs";
import { AxiosResponse } from "axios";
import { Currency } from "../common/types";
import Uploader from "../common/upload";
import Api from "../common/api";
import Utils from "../common/utils";
import { DataItem } from "arbundles";
export declare const checkPath: (path: PathLike) => Promise<boolean>;
export default class NodeUploader extends Uploader {
    constructor(api: Api, utils: Utils, currency: string, currencyConfig: Currency);
    /**
     * Uploads a file to the bundler
     * @param path to the file to be uploaded
     * @returns the response from the bundler
     */
    uploadFile(path: string): Promise<AxiosResponse<any>>;
    private walk;
    /**
     * Preprocessor for BulkUploader, ensures it has a correct operating environment.
     * @param path - path to the folder to be uploaded
     * @param indexFile - path to the index file (i.e index.html)
     * @param batchSize - number of items to upload concurrently
     * @param interactivePreflight - whether to interactively prompt the user for confirmation of upload (CLI ONLY)
     * @returns
     */
    uploadFolder(path: string, indexFile?: string, batchSize?: number, interactivePreflight?: boolean, logFunction?: Function): Promise<string>;
    /**
     * Synchronises the manifest to disk
     * @param manifest - manifest object
     * @param manifestPath - path to the JSON file to write to
     */
    private syncManifest;
    /**
     * Asynchronous chunking uploader, able to upload an array of dataitems or paths
     * Paths allow for an optional arweave manifest, provided they all have a common base path [path]
     * Syncs manifest to disk every 5 (or less) items.
     * @param items - Array of DataItems or paths
     * @param path  - Common base path for provided path items
     * @param batchSize - number of items to upload concurrently
     * @param logFunction - function to use for logging, defaults to voiding logs. should take a string to log as the first arg, can be async.
     * @returns - object containing responses for successful and failed items, as well as the manifest Txid if applicable
     */
    bulkUploader(items: DataItem[] | string[], path?: string, batchSize?: number, logFunction?: Function): Promise<{
        processed: Map<string, any>;
        failed: Map<string, any>;
        manifestTx?: string;
        logs?: any;
    }>;
}
