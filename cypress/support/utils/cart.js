import { parsePrice } from '../../../support/utils/price';

function buildProductAssertObj(product, quantity = 1) {
  const price = parsePrice(product.price);
  return {
    name: product.name,
    price,
    quantity,
    total: price * quantity
  };
}
