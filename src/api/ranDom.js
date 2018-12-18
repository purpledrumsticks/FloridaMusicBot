const ranDom = function ranDom (arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

module.exports = ranDom;
