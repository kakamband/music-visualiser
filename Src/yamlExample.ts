const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
const yamlTest = () :void =>{
    try {
      const doc = yaml.safeLoad(fs.readFileSync('./Test.yml', 'utf8'));
      console.log(doc);
    } catch (e) {
      console.log(e);
    }
}

export {yamlTest};

/* gulp clean && gulp start && gulp ava */