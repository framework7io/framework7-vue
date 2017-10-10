const Directives = {};
['color', 'color-theme', 'text-color', 'bg-color', 'border-color', 'ripple-color'].forEach((name) => {
  Directives[`f7-${name}`] = {
    bind(el, binding) {
      const { value, oldValue } = binding;
      if (!el.classList) return;
      if (!value) return;
      if (oldValue) {
        el.classList.remove(`${name}-${oldValue}`);
      }
      if (value) {
        el.classList.add(`${name}-${value}`);
      }
    },
    update(el, binding) {
      const { value, oldValue } = binding;
      if (value === oldValue) return;
      if (oldValue) {
        el.classList.remove(`${name}-${oldValue}`);
      }
      if (value) {
        el.classList.add(`${name}-${value}`);
      }
    },
  };
});

export default Directives;
