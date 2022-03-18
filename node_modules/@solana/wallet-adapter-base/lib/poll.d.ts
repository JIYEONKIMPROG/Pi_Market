import { WalletAdapter } from './adapter';
export declare function poll(callback: () => boolean | Promise<boolean>, interval: number, count: number): void;
export declare function pollUntilReady(adapter: WalletAdapter, pollInterval: number, pollCount: number): void;
