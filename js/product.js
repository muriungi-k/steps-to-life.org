(() => {
  const id=new URLSearchParams(location.search).get('id');
  const product=products.find(item=>item.id===Number(id));
  const details=document.querySelector('.product-details');
  if(!product){details.replaceChildren();const heading=document.createElement('h1');heading.textContent='Select a resource';const link=document.createElement('a');link.href='shop.html#products';link.textContent='Browse resources in the shop';details.append(heading,link);return;}
  document.querySelector('#product-image').src=product.image;
  document.querySelector('#product-image').alt=product.title+' book cover';
  for(const [key,value] of Object.entries({title:product.title,category:product.category,price:Store.money(product.price),description:product.description,author:'Contact the ministry for edition details',publisher:'Contact the ministry',language:'Contact the ministry',pages:'Contact the ministry',isbn:'Contact the ministry','category-table':product.category})) {
    document.querySelector('#product-'+key).textContent=value;
  }
  document.querySelector('.info-container').replaceChildren();const description=document.createElement('p');description.textContent=product.description;document.querySelector('.info-container').append(description);
  const quantity=document.querySelector('.quantity-controls input');quantity.max=99;quantity.step=1;
  const controls=document.querySelectorAll('.quantity-controls button');
  controls[0].addEventListener('click',()=>quantity.value=Store.quantity(Number(quantity.value)-1));
  controls[1].addEventListener('click',()=>quantity.value=Store.quantity(Number(quantity.value)+1));
  quantity.addEventListener('change',()=>quantity.value=Store.quantity(quantity.value));
  function add(){if(!quantity.reportValidity())return false;try{Store.add(product,quantity.value);return true;}catch{SiteActions.status(details,'Your browser could not save the cart. Enable site storage and try again.');return false;}}
  document.querySelector('#product-cart-btn').addEventListener('click',()=>{if(add())SiteActions.status(details,product.title+' added to your cart.');});
  document.querySelector('#buy-now-btn').addEventListener('click',()=>{if(add())location.href='checkout.html';});
})();
