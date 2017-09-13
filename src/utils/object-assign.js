function assign(target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  const to = Object(target);
  for (let i = 1; i < arguments.length; i += 1) {
    const nextSource = arguments[i]; // eslint-disable-line prefer-rest-params
    if (nextSource === undefined || nextSource === null) {
      continue; // eslint-disable-line no-continue
    }

    const keysArray = Object.keys(Object(nextSource));
    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
      const nextKey = keysArray[nextIndex];
      const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: assign,
  });
}
