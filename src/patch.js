const { setProp, removeProp, mountElement } = require("./mount");

function patch(parent, diff, index = 0) {
  if (!diff) return;
  const element = parent.childNodes[index];

  switch (diff.type) {
    case "CREATE":
      return parent.appendChild(mountElement(diff.node));
    case "REMOVE":
      return parent.removeChild(mountElement(element));
    case "REPLACE":
      return parent.replaceChild(mountElement(diff.node), element);
    case "UPDATE":
      const { propsPatches, childrenPatches } = diff;
      patchProps(element, propsPatches);
      for (let i = 0; i < childrenPatches.length; i++) {
        patch(element, childrenPatches[i], i);
      }

      return parent.replaceChild(mountElement(diff.node), element);
  }
}

function patchProps(node, patches) {
  patches.forEach((patch) => {
    const { type, attr, value } = patch;
    if (type === "SET_PROP") setProp(node, attr, value);
    else if (type === "REMOVE_PROP") removeProp(node, attr);
  });
}

export default patch;
