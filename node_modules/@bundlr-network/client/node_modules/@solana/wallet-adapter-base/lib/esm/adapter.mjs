import EventEmitter from 'eventemitter3';
export { EventEmitter };
/**
 * A wallet's readiness describes a series of states that the wallet can be in,
 * depending on what kind of wallet it is. An installable wallet (eg. a browser
 * extension like Phantom) might be `Installed` if we've found the Phantom API
 * in the global scope, or `NotDetected` otherwise. A loadable, zero-install
 * runtime (eg. Torus Wallet) might simply signal that it's `Loadable`. Use this
 * metadata to personalize the wallet list for each user (eg. to show their
 * installed wallets first).
 */
export var WalletReadyState;
(function (WalletReadyState) {
    /**
     * User-installable wallets can typically be detected by scanning for an API
     * that they've injected into the global context. If such an API is present,
     * we consider the wallet to have been installed.
     */
    WalletReadyState["Installed"] = "Installed";
    WalletReadyState["NotDetected"] = "NotDetected";
    /**
     * Loadable wallets are always available to you. Since you can load them at
     * any time, it's meaningless to say that they have been detected.
     */
    WalletReadyState["Loadable"] = "Loadable";
    /**
     * If a wallet is not supported on a given platform (eg. server-rendering, or
     * mobile) then it will stay in the `Unsupported` state.
     */
    WalletReadyState["Unsupported"] = "Unsupported";
})(WalletReadyState || (WalletReadyState = {}));
export class BaseWalletAdapter extends EventEmitter {
    get connected() {
        return !!this.publicKey;
    }
}
export function scopePollingDetectionStrategy(detect) {
    // Early return when server-side rendering
    if (typeof window === 'undefined' || typeof document === 'undefined')
        return;
    const poll = () => {
        // Wallet detected, nothing more to do
        if (detect())
            return;
        // Wallet not detected yet, try detecting every second
        const interval = setInterval(() => {
            // Wallet detected, nothing more to do
            if (detect()) {
                clearInterval(interval);
            }
        }, 1000);
    };
    if (document.readyState === 'complete') {
        poll();
        return;
    }
    function listener() {
        window.removeEventListener('load', listener);
        poll();
    }
    window.addEventListener('load', listener);
}
//# sourceMappingURL=adapter.js.map