"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryConfigurationStore = void 0;
class MemoryConfigurationStore {
    constructor() {
        this.data = new Map();
    }
    get(key) {
        return this.data.get(key);
    }
    set(key, value) {
        this.data.set(key, value);
    }
}
exports.MemoryConfigurationStore = MemoryConfigurationStore;
