// getTuple :: (Promise a | Function b) -> a
// Usage: `const [err, result] = await getTuple(Promise);`
export default function getTuple(dangerous) {
  if (!dangerous) throw new Error('Must not be a Null or undefined');
  if (dangerous.constructor === Promise) {
    return dangerous.then(data => [null, data]).catch(err => [err]);
  } else if (typeof dangerous === 'function') {
    return Promise.resolve(dangerous)
      .then(fn => [null, fn()])
      .catch(err => [err]);
  }
  throw new Error('getTuple', 'Must be a Promise or Function');
}
