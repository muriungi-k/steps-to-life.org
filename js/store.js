(() => {
  const quantity = value => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(99, Math.max(1, Math.floor(number))) : 1;
  };
  function normalize(items) {
    if (!Array.isArray(items) || !Array.isArray(window.products)) return [];
    const result = new Map();
    for (const item of items.slice(0,100)) {
      if (!item || typeof item !== 'object') continue;
      const product = window.products.find(p => p.id === Number(item.id) || (!item.id && p.title === (item.title || item.name)));
      if (!product) continue;
      const count = quantity(item.quantity);
      const previous = result.get(product.id);
      result.set(product.id, { ...product, quantity: quantity((previous?.quantity || 0) + count) });
    }
    return [...result.values()];
  }
  const getCart = () => {
    try {
      const raw = localStorage.getItem('cart');
      if (!raw || raw.length > 50000) return [];
      return normalize(JSON.parse(raw));
    } catch { return []; }
  };
  const save = cart => {
    localStorage.setItem('cart', JSON.stringify(normalize(cart)));
    window.dispatchEvent(new Event('cartchange'));
  };
  function add(product, amount = 1) {
    const catalogProduct = window.products?.find(p => p.id === product?.id);
    if (!catalogProduct) throw new Error('Unknown product');
    const cart = getCart();
    const existing = cart.find(item => item.id === catalogProduct.id);
    if (existing) existing.quantity = quantity(existing.quantity + quantity(amount));
    else cart.push({ ...catalogProduct, quantity: quantity(amount) });
    save(cart);
  }
  window.Store = Object.freeze({ getCart, save, add, quantity, money: value => '$' + Number(value).toFixed(2), total: cart => cart.reduce((sum,item) => sum + Math.round(item.price * 100) * item.quantity,0) / 100 });
})();
