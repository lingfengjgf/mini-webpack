function require(filename) {
  const map = {
    "./main.js": mainJs,
    "./foo.js": fooJs,
  };

  const module = {
    exports: {},
  };
  const fn = map[filename];
  fn(require, module, module.exports);

  return module.exports;
}

// main.js
function mainJs(require, module, exports) {
  // esm -> cjs
  const { foo } = require("./foo.js");

  console.log("main.js");

  foo();
}

// foo.js
function fooJs(require, module, exports) {
  exports.foo = function foo() {
    console.log("foo");
  };
}

require("./main.js");
