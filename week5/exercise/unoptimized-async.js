const unOptimizedAsync = (fn, args) => {
  const delay = 10_000;
  return new Promise((resolve, reject) => {
    const startTime = new Date();
    const res = fn.call(null, args);
    const fnEndTime = new Date();
    const timeDiff = fnEndTime - startTime; // diff in milliseconds
    if (timeDiff > delay) { reject('function took too long'); }
    setTimeout(resolve, delay - timeDiff, res);
  });
}
