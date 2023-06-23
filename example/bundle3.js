(function (modules) {
  function require(id) {
    const module = {
      exports: {},
    };
    const [fn, mapping] = modules[id];

    function localRequire(filename) {
      const id = mapping[filename];
      return require(id);
    }

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(1);
})({
  1: [
    function (require, module, exports) {
      // esm -> cjs
      const { foo } = require("./foo.js");

      console.log("main.js");

      foo();
    },
    { "./foo.js": 2 },
  ],
  2: [
    function (require, module, exports) {
      exports.foo = function foo() {
        console.log("foo");
      };
    },
    {},
  ],
});
