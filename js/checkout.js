(() => {
  const form=document.querySelector('#checkout-form');
  const items=document.querySelector('#checkout-items');
  const cart=Store.getCart();
  cart.forEach(item=>{const line=document.createElement('p');line.textContent=`${item.title} × ${item.quantity} — ${Store.money(item.price*item.quantity)}`;items.append(line);});
  document.querySelector('#checkout-total').textContent=Store.money(Store.total(cart));
  if(!cart.length){items.textContent='Your cart is empty. Return to the shop to add resources.';form.querySelector('button').disabled=true;}
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const current=Store.getCart();
    if(!current.length){SiteActions.status(form,'Your cart is empty.');return;}
    const names=['name','email','phone','country','county','city','postcode','address'];
    const details=names.map(name=>`${name}: ${document.querySelector('#customer-'+name).value}`).join('\n');
    const order=current.map(item=>`${item.title} x ${item.quantity}: ${Store.money(item.price*item.quantity)}`).join('\n');
    SiteActions.draft('Resource order inquiry',`${details}\n\n${order}\nResource subtotal: ${Store.money(Store.total(current))}\nPlease confirm availability, pricing, shipping, and payment instructions. No payment has been made.`,form);
  });
})();
