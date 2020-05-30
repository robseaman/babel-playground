const parser = require('@babel/parser');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);
// console.log(ast);

traverse(ast, {
  enter(path) {
    // // without babel types
    // if (path.node.type === 'Identifier' && path.node.name === 'n') {
    //   path.node.name = 'x';
    // }
    // with babel types
    if (t.isIdentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  },
});

// console.log(generate(ast).code);
console.log(generate(ast, {}, code));
