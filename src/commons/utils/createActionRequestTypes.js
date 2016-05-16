export default (base) => {
  const res = {};
  ['REQUEST', 'SUCCESS', 'FAILURE'].forEach(type => res[type] = `${base}_${type}`)
  return res;
}
