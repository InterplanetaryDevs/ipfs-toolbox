"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockIpfsClusterApi = void 0;
class MockIpfsClusterApi {
    add(data, options) {
        return Promise.resolve(undefined);
    }
    get allocations() {
        return undefined;
    }
    id() {
        return Promise.resolve(undefined);
    }
    get peers() {
        return undefined;
    }
    get pins() {
        return undefined;
    }
    version() {
        return Promise.resolve({
            version: 'test'
        });
    }
}
exports.MockIpfsClusterApi = MockIpfsClusterApi;
