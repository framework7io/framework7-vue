const Directives = {};
['color', 'color-theme', 'text-color', 'bg-color', 'border-color', 'ripple-color'].forEach((name) => {
  Directives[`f7-${name}`] = function f7ColorDirective(el, binding) {
    const { value, oldValue } = binding;
    if (value === oldValue) return;
    if (!value && !oldValue) return;
    if (oldValue) {
      el.classList.remove(`${name}-${oldValue}`);
    }
    if (value) {
      el.classList.add(`${name}-${value}`);
    }
  };
});

export default Directives;
