/// <reference types="node" />
import Transport from '@ledgerhq/hw-transport';
import { PublicKey, Transaction } from '@solana/web3.js';
export declare function getDerivationPath(account?: number, change?: number): Buffer;
export declare function getPublicKey(transport: Transport, derivationPath: Buffer): Promise<PublicKey>;
export declare function signTransaction(transport: Transport, transaction: Transaction, derivationPath: Buffer): Promise<Buffer>;
