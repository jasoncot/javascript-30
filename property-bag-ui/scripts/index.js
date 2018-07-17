'use script';

const {exports} = (() => {
  const ucFirst = function (string) {
    return string[0].toUpperCase() + string.slice(1);
  };

  const lcFirst = function (string) {
    return string[0].toLowerCase() + string.slice(1);
  };

  const curry = function (argCount, curriedFunction) {
    const argsV = [];
    const addParams = (args) => {
      if (args) {
        (Array.isArray(args) ? args : [args]).forEach(arg => argsV.push(arg));
      }
    };
    const getParams = () => argsV.slice(0, argCount);

    const deferredFunction = (...args) => {
      const runCurried = argsV.length >= argCount;
      if (args.length > 0) {
        addParams(args);
      }
      return runCurried ? curriedFunction(...getParams()) : deferredFunction;
    };

    return deferredFunction;
  };

  const is = curry(2, function (type, input) {
    return input instanceof type;
  });

  const concat = function (o0, o1) {
    const isString = is(String);
    if (isString(o0) && isString(o1)) {
      return o0 + o1;
    }
    if (Array.isArray(o0) && Array.isArray(o1)) {
      const combined = o0.slice();
      for (let i = 0; i < o1.length; i += 1) {
        combined.push(o1[i]);
      }
      return combined;
    }
  };

  const toCamelCase = function (input) {
    return String(input)
      .split(/[ _-]/g)
      .map(str => str.replace(
        /^(.)(.*)$/,
        (subject, $1, $2, index, match) => {
          return `${$1.toUpperCase()}${$2}`;
        }
      ))
      .join('');
  };

  const fromPairs = (pairs) => {
    return pairs.reduce(
      (acc, val) => {
        const [key, value] = val;
        acc[key] = value;
        return acc;
      },
      {}
    );
  };

  const exports = {
    toCamelCase,
    concat,
    curry,
    is,
    ucFirst,
    lcFirst,
    fromPairs
  };

  const module = {};
  module.exports = exports;

  return module;
})();

window.propertyBag = exports;
