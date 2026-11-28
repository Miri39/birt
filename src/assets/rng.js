(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.rng = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  function hashString(text) {
    let hash = 0;
    const str = String(text);
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash;
  }

  function seededRandom(seedText) {
    let seed = typeof seedText === 'number' ? seedText : hashString(seedText);
    return function() {
      seed = (seed * 1664525 + 1013904223) | 0;
      return (seed >>> 0) / 4294967296;
    };
  }

  return {
    hashString,
    seededRandom
  };
}));
