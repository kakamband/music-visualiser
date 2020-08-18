console.log('test');
const envConf = require('dotenv').config({ path: './Src/Env/default.env' });

if (envConf.error)
{
    process.stderr.write(`Error ${envConf.error}`);
    process.exit(1);
}


const func = () => {
    process.stdout.write(`Envrionment variable: ${process.env.ENV__MY_ENV_VAR}\n\n`);
};
