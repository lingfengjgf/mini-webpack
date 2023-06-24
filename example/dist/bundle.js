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

  '1' : [function (require, module, exports) {
    "use strict";

var _foo = require("./foo.js");

var _data = require("./data.json");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("main.js");
console.log(_data2.default);
(0, _foo.foo)();
      }, {"./foo.js":2,"./data.json":3}],
        
  '2' : [function (require, module, exports) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  console.log("foo");
}
      }, {}],
        
  '3' : [function (require, module, exports) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "name": "webpack loader"
};
      }, {}],
        
          });