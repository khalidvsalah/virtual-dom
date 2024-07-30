function change(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function diffProps(prevProps, nextProps) {
  const props = Object.assign({}, prevProps, nextProps);
  const patches = [];
  Object.keys(props).forEach((attr) => {
    if (
      !prevProps[attr] ||
      nextProps[attr].toString() !== prevProps[attr].toString()
    ) {
      patches.push({
        type: "SET_PROP",
        attr,
        value: props[attr],
      });
    }

    if (!nextProps[attr]) {
      patches.push({
        type: "REMOVE_PROP",
        attr,
      });
    }
  });
  return patches;
}

function diffChildren(prevChildren, nextChildren) {
  const patches = [];
  const diffLength = Math.max(prevChildren.length, nextChildren.length);
  for (let i = 0; i < diffLength; i++) {
    const diffing = diff(prevChildren[i], nextChildren[i]);
    if (diffing) patches.push(diffing);
  }
  return patches;
}

function diff(prev, next) {
  if (!prev) return { type: "CREATE", node: next };
  if (!next) return { type: "REMOVE" };

  if (change(prev, next)) return { type: "REPLACE", node: next };

  if (next.type) {
    const propsPatches = diffProps(prev.props, next.props);
    const childrenPatches = diffChildren(prev.children, next.children);

    if (childrenPatches.length || propsPatches.length) {
      return {
        type: "UPDATE",
        node: next,
        propsPatches,
        childrenPatches,
      };
    }
  }
}

export default diff;
