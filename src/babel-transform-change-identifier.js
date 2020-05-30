const transformChangeIdentifier = (babel) => {
  const t = babel.types; // notice types is a property of babel

  const updateParamNameVisitor = {
    Identifier(path) {
      if (path.node.name === this.paramName) {
        path.node.name = this.changeTo;
      }
    },
  };

  const MyVisitor = {
    FunctionDeclaration(path, state) {
      const param = path.node.params[0];
      const paramName = param.name;
      const changeTo =
        state.opts && typeof state.opts.changeTo === 'string'
          ? state.opts.changeTo
          : 'x';
      param.name = changeTo;

      path.traverse(updateParamNameVisitor, { paramName, changeTo });
    },
  };

  return {
    name: 'transform-change-identifier',
    visitor: MyVisitor,
  };
};

module.exports = transformChangeIdentifier;
