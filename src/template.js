const t = require('@babel/types');
const generate = require('@babel/generator').default;
const template = require('@babel/template').default;

const buildRequire = template(`
  var %%importName%% = require(%%source%%);
`);

const ast = buildRequire({
  importName: t.identifier('myModule'),
  source: t.stringLiteral('my-module'),
});

console.log(generate(ast).code);
