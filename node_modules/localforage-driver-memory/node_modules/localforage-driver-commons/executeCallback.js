"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}
exports.executeCallback = executeCallback;
//# sourceMappingURL=executeCallback.js.map