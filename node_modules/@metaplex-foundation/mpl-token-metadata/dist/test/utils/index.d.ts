import debug from 'debug';
export * from './address-labels';
export * from './metadata';
export declare const logError: debug.Debugger;
export declare const logInfo: debug.Debugger;
export declare const logDebug: debug.Debugger;
export declare const logTrace: debug.Debugger;
export declare const programIds: {
    metadata: string;
    vault: string;
    auction: string;
    metaplex: string;
};
export declare const DEVNET: string;
export declare const connectionURL: string;
export declare function dump(x: object): void;
export declare function killStuckProcess(): void;
