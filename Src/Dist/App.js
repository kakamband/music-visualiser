"use strict";
console.log('test');
var envConf = require('dotenv').config({ path: './Src/Env/default.env' });
if (envConf.error) {
    process.stderr.write("Error " + envConf.error);
    process.exit(1);
}
var func = function () {
    process.stdout.write("Envrionment variable: " + process.env.ENV__MY_ENV_VAR + "\n\n");
};
