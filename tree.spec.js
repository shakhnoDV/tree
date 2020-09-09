const depthTraversalTree = require('./depthTraversalTree');
const assert = require('assert')

beforeEach(() => {
    testStartTime = new Date().getTime();
});
test('depthTraversalTree should return the sequence of tree nodes in depth-first order', () => {

    /*
     *     source tree (root = 1):
     *
     *            1
     *          / | \
     *         2  6  7
     *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
     *       3   4     8
     *           |
     *           5
     */

    var node1 = { n: 1 }, node2 = { n: 2 }, node3 = { n: 3 }, node4 = { n: 4 }, node5 = { n: 5 }, node6 = { n: 6 }, node7 = { n: 7 }, node8 = { n: 8 };
    node1.children = [node2, node6, node7];
    node2.children = [node3, node4];
    node4.children = [node5];
    node7.children = [node8];
    var expected = [node1, node2, node3, node4, node5, node6, node7, node8];
    var index = 0;
    for (let num of depthTraversalTree(node1)) {
        if (index >= expected.length) assert.fail(index, expected.length, `sequence length should be equal to ${expected.length}`);
        assert.equal(
            num.n,
            expected[index++].n,
            `Sequence mismatch at index no ${index}:`
        );
    }
    if (index < expected.length) assert.fail(index, expected.length, `sequence length should be equal to ${expected.length}`);
});

const MAX_NODE_COUNT = 100000;

function createDeepTree() {
    var root = { n: MAX_NODE_COUNT };
    for (var i = MAX_NODE_COUNT - 1; i > 0; i--) {
        root = { n: i, children: [root] };
    }
    return root;
}

function createWideTree() {
    var root = { n: 1, children: [] };
    for (var i = 2; i <= MAX_NODE_COUNT; i++) {
        root.children.push({ n: i });
    }
    return root;
}

test('depthTraversalTree should process a deep tree', () => {
    var root = createDeepTree();
    var index = 1;
    for (let node of depthTraversalTree(root)) {
        if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT, `sequence length should be equal to ${MAX_NODE_COUNT}`);
        assert.equal(
            node.n,
            index,
            `Sequence mismatch at index no ${index}:`
        );
        index++;
    }
    if (index - 1 < MAX_NODE_COUNT) assert.fail(index - 1, MAX_NODE_COUNT, `sequence length should be equal to ${MAX_NODE_COUNT}`);
});

test('depthTraversalTree should process a wide tree', () => {
    const testTimeoutInMs = 30000;
    var root = createWideTree();
    var index = 1;
    for (let node of depthTraversalTree(root)) {
        if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT, `sequence length should be equal to ${MAX_NODE_COUNT}`);
        assert.equal(
            node.n,
            index,
            `Sequence mismatch at index no ${index}:`
        );
        index++;
    }
    if (index - 1 < MAX_NODE_COUNT) assert.fail(index - 1, MAX_NODE_COUNT, `sequence length should be equal to ${MAX_NODE_COUNT}`);
    if (new Date().getTime() - testStartTime > testTimeoutInMs) {
        assert.fail(`Test took longer than ${testTimeoutInMs}ms!`);
    }
});
