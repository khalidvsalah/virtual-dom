export function setProp(node, attr, value) {
  if (attr === "className") {
    node.className = value;
  } else {
    node.setAttribute(attr, value);
  }
}

export function removeProp(node, attr) {
  if (attr === "className") {
    node.className = "";
  } else {
    node.removeAttribute(attr);
  }
}

function setProps(element, props) {
  for (const key in props) {
    if (key === "className") {
      setProp(element, key, props[key]);
      continue;
    }

    const match = /^on(.*)/.exec(key);
    if (match) {
      element[match[0].toLowerCase()] = props[key];
      continue;
    }

    element.setAttribute(key, props[key]);
  }
}

export function mountElement(node) {
  let result;
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  } else {
    result = document.createElement(node.type);
    if (node.props) setProps(result, node.props);
    node.children.map((child) => result.appendChild(mountElement(child)));
  }

  return result;
}
