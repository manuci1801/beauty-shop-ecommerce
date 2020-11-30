export default function formatPrice(x) {
  x += "";
  return x.length
    ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "";
}
