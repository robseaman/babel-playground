const babel = require('@babel/core');

const code = `function square(n) {
  return n * n;
}`;

function transformChangeIdentifier(babel) {
  const t = babel.types; // notice types is a property of babel

  const updateParamNameVisitor = {
    Identifier(path) {
      if (path.node.name === this.paramName) {
        path.node.name = 'x';
      }
    },
  };

  const MyVisitor = {
    FunctionDeclaration(path) {
      const param = path.node.params[0];
      const paramName = param.name;
      param.name = 'x';

      path.traverse(updateParamNameVisitor, { paramName });
    },
  };

  return {
    name: 'transform-change-identifier',
    visitor: MyVisitor,
  };
}

/**
 * there are lots of transform() variants, e.g. transformSync, transformAsync,
 * transformFile, transformFileAsync, transformFromAst, transformFromAstSync,
 * transformFromAstAsync. And different call/return variants of many of thosse
 */
const result = babel.transform(code, {
  plugins: [transformChangeIdentifier],
  filename: 'transformChangeIdentifier', // module name for errors
});

console.log(result.code);
