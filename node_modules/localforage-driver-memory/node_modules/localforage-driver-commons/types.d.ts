export interface LocalForageDbInstanceOptions {
    name?: string;
    storeName?: string;
}
export interface LocalForageOptions extends LocalForageDbInstanceOptions {
    description?: string;
    driver?: string | string[];
    size?: number;
    version?: number;
}
