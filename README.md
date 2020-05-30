# Babel Playground

Babel Playground is a series of notes as code I used to understand how to write debug and test a Babel Plugin. The initial focus captured in this code was on tooling vs ASTs and Babel types so I could write code locally instead of relying on [AST Explorer](https://astexplorer.net/#); in fact the demo code here is just the squaring demo from the Babel and [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md) sites.

## Installation

```bash
yarn
```

## Demo apps

The apps are all done with node and use CommonJS so you'll need to do some minor translation to imports/exports for common ES Modules.

- `node src/traverse` has a parse-traverse-generate implementation. Code with and without types is show.
- `node src/template` shows how to use templates with `syntactic placeholders`.
- `node src/transform` shows a plugin implementation with types coming from the babel object.
- `node src/transformFile` shows a plugin implementation with a plugin in the `babel-transform-change-identifier` file that can be used on one more `input.js` files coming from `__tests__/fixtures` folders. The `babel-transform-change-identifier`plugin transform take options and `transformFile` will read the options from one or more optional `options.js` files that correspond to the input files. A vscode debug configuration also exists so that `transformFile.js` or the plugin can be examined and debugged in a normal way.
- `yarn jest` builds on `transformFile` to run a test suite with text fixtures. There is also a vscode configuration for `jest`. This is really what I wanted out of this playground. How to create a debuggable set of tests that run a set of text fixtures with configurable plugin options that go with the fixtures that is easy to use with Jest. Output is checked against a Jest snapshot. Other options would be to manually create `output.js` files or redirect snapshot output to `output.js` files but the default snapshot behavior seems fine so I'm stopping here.

## References

- [AST Explorer](https://astexplorer.net/#)
- [Babel repl](https://babeljs.io/repl)
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
- [Babel AST Spec](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)
- [@babel/helper-plugin-test-runner](https://github.com/babel/babel/tree/master/packages/babel-helper-plugin-test-runner) which uses the [@babel/helper-transform-fixture-test-runner](https://github.com/babel/babel/tree/master/packages/babel-helper-transform-fixture-test-runner) for implementing tests for the official `@babel` plugins. This doesn't look suitable outside of the mono repo but could be adapted to something general purpose.
- [babel-plugin-tester](https://github.com/babel-utils/babel-plugin-tester) A complete test wrapper for testing a plugin. Get this if the last demo in this doc lacks the functionality you want or you don't like seeing the 30 some lines of setup code in your tests.
