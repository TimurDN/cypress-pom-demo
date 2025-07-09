export function parsePrice(str) {
  const match = str.match(/[\d,]+/);
  return match ? Number(match[0].replace(/,/g, '')) : 0;
}
