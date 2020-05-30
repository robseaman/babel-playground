const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');
const transformChangeIdentifier = require('./babel-transform-change-identifier.js');

const rootPath = (fixtureName) =>
  path.join(path.resolve(), 'src', '__tests__', '__fixtures__', fixtureName);
const inputPath = (fixtureName) => path.join(rootPath(fixtureName), 'input.js');
const optionsPath = (fixtureName) =>
  path.join(rootPath(fixtureName), 'options.js');
const readOptions = (fixtureName) => {
  let optionsString;
  try {
    optionsString = fs.readFileSync(optionsPath(fixtureName), 'utf8');
  } catch (err) {
    // no options are passed as undefined, {} would work
    if (err.code === 'ENOENT') {
      return undefined;
    }
    throw err; // any other readfile error is a concern
  }
  let val;
  return eval(`val = ${optionsString}`); // allow eval to throw it's own errors
};

const runTransform = (plugin, fixtureName) => {
  const options = readOptions(fixtureName);

  const result = babel.transformFileSync(inputPath(fixtureName), {
    plugins: [[plugin, options]],
    filename: fixtureName, // name for errors
    root: rootPath(fixtureName), // allow the fixture to contain babelrc
    configFile: false, // don't search
  });
  return result && result.code ? result.code : '';
};

['case1', 'case2'].forEach((testCase) => {
  const result = runTransform(transformChangeIdentifier, testCase);
  console.log(result);
});
