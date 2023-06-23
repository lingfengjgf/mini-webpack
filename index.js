const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { resolve } = require("path");
const { transformFromAst } = require("babel-core");
const ejs = require("ejs");

let id = 1;
// asset
function createAsset(filename) {
  // 1、获取文件内容
  const source = fs.readFileSync(filename, {
    encoding: "utf-8",
  });

  // 2、获取依赖关系 ast
  const ast = parser.parse(source, {
    sourceType: "module",
  });

  const deps = [];
  traverse(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value);
    },
  });

  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });
  return {
    id: id++,
    code,
    deps,
    filename,
    mapping: {},
  };
}

function createGraph() {
  const mianAsset = createAsset("./example/main.js");
  const queue = [mianAsset];

  for (const asste of queue) {
    // 如何避免无限递归？(给当前的asset加个标识)
    asste.deps.forEach((relativePath) => {
      const childPath = resolve("./example", relativePath);
      const child = createAsset(childPath);
      asste.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

function build(graph) {
  function createModules(graph) {
    const modules = {};
    graph.forEach((asset) => {
      modules[asset.id] = [asset.code, asset.mapping];
    });

    return modules;
  }

  function createContext(modules) {
    const template = fs.readFileSync("./bundle.ejs", {
      encoding: "utf-8",
    });
    return ejs.render(template, { modules });
  }

  function emitFile(context) {
    fs.writeFileSync("./example/dist/bundle.js", context);
  }

  const modules = createModules(graph);
  console.log(modules);
  emitFile(createContext(modules));
}
const graph = createGraph();
build(graph);
// console.log(graph);
