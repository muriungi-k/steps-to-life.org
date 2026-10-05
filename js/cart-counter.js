function updateCartCounter() {
  const count = Store.getCart().reduce((total,item) => total + item.quantity,0);
  document.querySelectorAll('#cart-count').forEach(counter => { counter.textContent = count; });
}
updateCartCounter();
window.addEventListener('cartchange',updateCartCounter);
window.addEventListener('storage',updateCartCounter);
