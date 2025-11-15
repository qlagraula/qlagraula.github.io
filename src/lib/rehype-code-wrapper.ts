import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export function rehypeCodeWrapper() {
  return function (tree: Root) {
    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName != 'pre') {
        return;
      }

      if (!node.properties || !node.properties.dataFilename) {
        return;
      }

      const filename = node.properties.dataFilename as string;

      const wrapper = h('div.code-container', [
        h('div.code-header', [
          h('div.code-filename', [filename]),
          h('div.code-copy'),
        ]),
        node,
      ]);

      if (parent && index != null) {
        parent.children[index] = wrapper;
      }
    });
  };
}
