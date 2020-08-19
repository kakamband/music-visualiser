"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yamlTest = void 0;
const yaml = require('js-yaml');
const fs = require('fs');
// Get document, or throw exception on error
const yamlTest = () => {
    try {
        const doc = yaml.safeLoad(fs.readFileSync('./Test.yml', 'utf8'));
        console.log(doc);
    }
    catch (e) {
        console.log(e);
    }
};
exports.yamlTest = yamlTest;
/* gulp clean && gulp start && gulp ava */ 
//# sourceMappingURL=yamlExample.js.map