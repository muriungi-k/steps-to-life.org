(() => {
  const items = document.querySelector('#cart-items');
  function render() {
    const cart = Store.getCart();
    items.replaceChildren();
    cart.forEach((item,index) => {
      const row = document.createElement('tr');
      for (const value of [item.title,Store.money(item.price)]) { const cell=document.createElement('td');cell.textContent=value;row.append(cell); }
      const quantity=document.createElement('td');
      const down=document.createElement('button');down.type='button';down.textContent='−';down.setAttribute('aria-label','Decrease quantity of '+item.title);
      const count=document.createElement('span');count.textContent=' '+item.quantity+' ';
      const up=document.createElement('button');up.type='button';up.textContent='+';up.setAttribute('aria-label','Increase quantity of '+item.title);
      down.addEventListener('click',()=> {if(cart[index].quantity>1){cart[index].quantity--;Store.save(cart);render();}});
      down.disabled=item.quantity===1;
      up.addEventListener('click',()=>{cart[index].quantity=Store.quantity(item.quantity+1);Store.save(cart);render();});up.disabled=item.quantity===99;
      quantity.append(down,count,up);row.append(quantity);
      const total=document.createElement('td');total.textContent=Store.money(item.price*item.quantity);row.append(total);
      const actions=document.createElement('td');const remove=document.createElement('button');remove.type='button';remove.className='remove-btn';remove.textContent='Remove';remove.addEventListener('click',()=>{cart.splice(index,1);Store.save(cart);render();});actions.append(remove);row.append(actions);items.append(row);
    });
    if(!cart.length) {const row=document.createElement('tr');const cell=document.createElement('td');cell.colSpan=5;cell.textContent='Your cart is empty. Browse the shop to add resources.';row.append(cell);items.append(row);}
    document.querySelector('#subtotal').textContent=Store.money(Store.total(cart));
    document.querySelector('#grand-total').textContent=Store.money(Store.total(cart));
    const checkout=document.querySelector('.checkout-btn');checkout.setAttribute('aria-disabled',String(!cart.length));
  }
  document.querySelector('.checkout-btn').addEventListener('click',event=>{if(!Store.getCart().length){event.preventDefault();SiteActions.status(items,'Add a resource to your cart before checkout.');}});
  window.addEventListener('storage',render);render();
})();
