/// <reference types="node" />
import { DataItem } from "arbundles";
import { AxiosResponse } from "axios";
import Utils from "./utils";
import Api from "./api";
import { Currency } from "./types";
export declare const sleep: (ms: number) => Promise<void>;
export default class Uploader {
    protected readonly api: Api;
    protected currency: string;
    protected currencyConfig: Currency;
    protected utils: Utils;
    constructor(api: Api, utils: Utils, currency: string, currencyConfig: Currency);
    /**
     * Uploads data to the bundler
     * @param data
     * @param tags
     * @returns the response from the bundler
     */
    upload(data: Buffer, tags?: {
        name: string;
        value: string;
    }[]): Promise<AxiosResponse<any>>;
    /**
     * Uploads a given dataItem to the bundler
     * @param dataItem
     */
    dataItemUploader(dataItem: DataItem): Promise<AxiosResponse<any>>;
}
