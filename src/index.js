function render(element, node) {
  element.append(mountElement(node));
}

function setState(parent, prevElement, nextElement) {
  const diffing = diff(prevElement, nextElement);
  patch(parent, diffing);
}

function createComponent(count, className) {
  const r = [...Array(count).keys()];
  return {
    type: "button",
    props: { className, onClick: () => console.log("Si") },
    children: r.map((n, key) => ({ type: "li", key, children: [count] })),
  };
}

(function () {
  const root = document.getElementById("root");
  const node = createComponent(1);

  render(root, node);
  setState(root, node, createComponent(1, "btn"));
})();
