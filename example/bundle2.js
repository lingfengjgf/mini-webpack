(function (modules) {
  function require(filename) {
    const module = {
      exports: {},
    };
    const fn = modules[filename];
    fn(require, module, module.exports);

    return module.exports;
  }

  require("./main.js");
})({
  "./main.js": function (require, module, exports) {
    // esm -> cjs
    const { foo } = require("./foo.js");

    console.log("main.js");

    foo();
  },
  "./foo.js": function (require, module, exports) {
    exports.foo = function foo() {
      console.log("foo");
    };
  },
});
