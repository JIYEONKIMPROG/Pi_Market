export function init(token?: string | undefined, store?: Map<string, any> | undefined): State;
export function handle(request: Request, { store }: State): Promise<Response>;
export type State = {
    AUTH_TOKEN: string;
    store: Map<string, any>;
};
import { Request } from "./mock-server.mjs";
import { Response } from "./mock-server.mjs";
//# sourceMappingURL=service.d.mts.map