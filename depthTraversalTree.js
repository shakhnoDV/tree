function* depthTraversalTree(root) {
    const stack = [{ node: root, index: 0 }];
    yield root;
    while (stack.length > 0) {
        const { node, index } = stack.pop();
        if (node.children && node.children.length > index) {
            yield node.children[index];
            if (node.children.length > index + 1) {
                stack.push({ node: node, index: index + 1 });
            }
            stack.push({ node: node.children[index], index: 0 });
        }
    }
}

module.exports = depthTraversalTree;