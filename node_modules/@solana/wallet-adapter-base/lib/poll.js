var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function poll(callback, interval, count) {
    if (count > 0) {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const done = yield callback();
            if (!done)
                poll(callback, interval, count - 1);
        }), interval);
    }
}
export function pollUntilReady(adapter, pollInterval, pollCount) {
    poll(() => {
        const { ready } = adapter;
        if (ready) {
            if (!adapter.emit('ready')) {
                console.warn(`${adapter.constructor.name} is ready but no listener was registered`);
            }
        }
        return ready;
    }, pollInterval, pollCount);
}
//# sourceMappingURL=poll.js.map