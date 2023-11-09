"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockIpfsClient = void 0;
class MockIpfsClient {
    add(entry, options) {
        return Promise.resolve(undefined);
    }
    addAll(source, options) {
        function generateSequence() {
            return __asyncGenerator(this, arguments, function* generateSequence_1() {
            });
        }
        return generateSequence();
    }
    cat(ipfsPath, options) {
        function generateSequence() {
            return __asyncGenerator(this, arguments, function* generateSequence_2() {
            });
        }
        return generateSequence();
    }
    commands(options) {
        return Promise.resolve([]);
    }
    dns(domain, options) {
        return Promise.resolve('');
    }
    get(ipfsPath, options) {
        function generateSequence() {
            return __asyncGenerator(this, arguments, function* generateSequence_3() {
            });
        }
        return generateSequence();
    }
    getEndpointConfig() {
        return undefined;
    }
    id(options) {
        return Promise.resolve(undefined);
    }
    isOnline() {
        return false;
    }
    ls(ipfsPath, options) {
        function generateSequence() {
            return __asyncGenerator(this, arguments, function* generateSequence_4() {
            });
        }
        return generateSequence();
    }
    mount(options) {
        return Promise.resolve(undefined);
    }
    ping(peerId, options) {
        function generateSequence() {
            return __asyncGenerator(this, arguments, function* generateSequence_5() {
            });
        }
        return generateSequence();
    }
    resolve(name, options) {
        return Promise.resolve('');
    }
    start() {
        return Promise.resolve(undefined);
    }
    stop(options) {
        return Promise.resolve(undefined);
    }
    version(options) {
        return Promise.resolve(undefined);
    }
}
exports.MockIpfsClient = MockIpfsClient;
