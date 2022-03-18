import { createContext, useContext } from 'react';
export const WalletContext = createContext({});
export function useWallet() {
    return useContext(WalletContext);
}
//# sourceMappingURL=useWallet.js.map