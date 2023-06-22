const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { resolve } = require("path");

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

  return {
    source,
    deps,
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
      queue.push(child);
    });
  }

  return queue;
}

const graph = createGraph();
console.log(graph);
