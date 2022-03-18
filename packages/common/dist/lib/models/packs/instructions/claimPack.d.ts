import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import BN from 'bn.js';
import { StringPublicKey } from '../../../utils';
import { ClaimPackParams } from '..';
interface Params extends ClaimPackParams {
    packSetKey: StringPublicKey;
    wallet: PublicKey;
    voucherMint: StringPublicKey;
    userToken: StringPublicKey;
    newMint: StringPublicKey;
    metadataMint: StringPublicKey;
    edition: BN;
}
export declare function claimPack({ index, packSetKey, wallet, voucherMint, userToken, newMint, metadataMint, edition, }: Params): Promise<TransactionInstruction>;
export {};
//# sourceMappingURL=claimPack.d.ts.map