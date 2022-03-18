"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const fund_1 = __importDefault(require("../common/fund"));
const utils_1 = __importDefault(require("../common/utils"));
class WebFund extends fund_1.default {
    constructor(utils) {
        super(utils);
    }
    async fund(amount, multiplier = 1.0) {
        const _amount = new bignumber_js_1.default(amount);
        if (!_amount.isInteger()) {
            throw new Error("must use an integer for funding amount");
        }
        const c = this.utils.currencyConfig;
        const to = await this.utils.getBundlerAddress(this.utils.currency);
        const baseFee = await c.getFee(c.base[0] === "winston" ? 0 : _amount, to);
        const fee = (baseFee.multipliedBy(multiplier)).toFixed(0).toString();
        const tx = await c.createTx(_amount, to, fee.toString());
        tx.txId = await c.sendTx(tx.tx);
        await this.utils.confirmationPoll(tx.txId);
        const bres = await this.utils.api.post(`/account/balance/${this.utils.currency}`, { tx_id: tx.txId });
        utils_1.default.checkAndThrow(bres, "Posting transaction information to the bundler");
        return { reward: fee, target: to, quantity: _amount.toString(), id: tx.txId };
    }
}
exports.default = WebFund;
//# sourceMappingURL=fund.js.map