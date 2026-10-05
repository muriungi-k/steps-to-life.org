(() => {
  const grid = document.querySelector('#product-grid');
  const input = document.querySelector('.search-container input');
  let category = 'All';
  const filters = [...document.querySelectorAll('.shop-filter button')];
  function render() {
    const query = input.value.trim().toLowerCase();
    const matches = products.filter(p => (category === 'All' || p.category === category) && (p.title+' '+p.description+' '+p.category).toLowerCase().includes(query));
    grid.replaceChildren();
    for (const product of matches) {
      const card = document.createElement('div');
      card.className = 'product-card';
      function element(tag, className, text) {
        const node = document.createElement(tag);
        node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
      }
      const imageBox = element('div', 'product-image');
      const image = element('img', '');
      image.src = product.image;
      image.alt = product.title + ' book cover';
      image.loading = 'lazy';
      imageBox.append(image);
      const content = element('div', 'product-content');
      content.append(element('div', 'product-category', product.category), element('h3', '', product.title), element('p', 'product-description', product.description), element('div', 'product-price', Store.money(product.price)));
      const actions = element('div', 'product-buttons');
      const add = element('button', 'cart-btn', 'Add To Cart');
      add.type = 'button';
      const view = element('a', 'view-btn', 'View Product');
      view.href = 'product.html?id=' + encodeURIComponent(product.id);
      actions.append(add, view);
      content.append(actions);
      card.append(imageBox, content);
      card.querySelector('button').addEventListener('click', () => {
        try { Store.add(product); window.SiteActions.status(grid, `${product.title} added to your cart.`); }
        catch { window.SiteActions.status(grid, 'Your browser could not save the cart. Enable site storage and try again.'); }
      });
      grid.append(card);
    }
    if (!matches.length) { const empty = document.createElement('p'); empty.textContent = 'No resources match this category or search. Select All or change your search.'; grid.append(empty); }
  }
  function filter(value) {
    category = value;
    filters.forEach(button => { const active = button.textContent.trim() === value; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
    render();
  }
  filters.forEach(button => button.addEventListener('click', () => filter(button.textContent.trim())));
  input.addEventListener('input',render);
  document.querySelector('.search-container button').addEventListener('click',render);
  input.addEventListener('keydown',event => { if(event.key === 'Enter') render(); });
  document.querySelectorAll('#categories .category-card').forEach(card => {
    const title = card.querySelector('h3').textContent.trim();
    const mappings = {'Christian Books':'Books','Health Ministry':'Health','Family Resources':'Family','Digital Downloads':'Digital'};
    card.setAttribute('role','button');card.tabIndex=0;
    const activate = () => { if(title==='Audio Sermons') { location.href='watch.html#featured-video';return; } filter(mappings[title] || title); document.querySelector('#products').scrollIntoView({block:'start'}); };
    card.addEventListener('click',activate);card.addEventListener('keydown',event => {if(['Enter',' '].includes(event.key)){event.preventDefault();activate();}});
  });
  render();
})();
