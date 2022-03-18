import BigNumber from "bignumber.js";
import Fund from "../common/fund";
import { FundData } from "../common/types";
import Utils from "../common/utils";
export default class WebFund extends Fund {
    constructor(utils: Utils);
    fund(amount: BigNumber.Value, multiplier?: number): Promise<FundData>;
}
