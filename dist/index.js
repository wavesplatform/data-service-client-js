var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-fetch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_fetch_1 = require("node-fetch");
    const { Asset } = require('@waves/data-entities');
    const createParser = require('parse-json-bignumber');
    class DataServiceClient {
        constructor(options) {
            if (!options.nodeUrl)
                throw new Error('No nodeUrl was presented in options object. Check constructor call.');
            this.getAssets = createGetAssets(options.nodeUrl);
        }
    }
    exports.default = DataServiceClient;
    const JSONBigParser = createParser();
    const fetchData = (parser) => (url) => {
        return node_fetch_1.default(url)
            .then(body => body.text())
            .then(text => parser(text));
    };
    const notString = (value) => typeof value !== 'string';
    const pipeM = (...fns) => (...args) => fns.reduce((prev, fn) => prev.then(v => fn(v)), Promise.resolve(args));
    const some = (predicate) => (arr) => arr.some(predicate);
    const validateIds = (ids) => __awaiter(this, void 0, void 0, function* () {
        return (console.log(ids),
            ids.some(notString)
                ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
                : Promise.resolve(ids));
    });
    const createQSForMany = (ids) => ids.map((id) => `ids[]=${encodeURIComponent(id)}`).join('&');
    const createUrlForMany = (nodeUrl) => (ids) => `${nodeUrl}/assets?${createQSForMany(ids)}`;
    const createGetAssets = (nodeUrl) => (...ids) => __awaiter(this, void 0, void 0, function* () {
        return pipeM(validateIds, createUrlForMany(nodeUrl), fetchData(JSONBigParser))(...ids);
    });
});
