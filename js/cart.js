function renderCartItems() {
  const container = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');
  if (!container) return;

  const items = DB.getCartItems();

  if (items.length === 0) {
    container.innerHTML = '';
    if (empty) empty.style.display = 'block';
    if (summary) summary.style.display = 'none';
    return;
  }

  if (empty) empty.style.display = 'none';
  if (summary) summary.style.display = 'block';

  container.innerHTML = items.map(item => `
    <div class="flex gap-6 py-8 border-b border-outline-variant/30 cart-item" data-id="${item.productId}">
      <div class="w-24 h-32 bg-surface-container-low overflow-hidden flex-shrink-0">
        <img class="w-full h-full object-cover" src="${item.product.image}" alt="${item.product.name}" />
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start">
            <h3 class="font-body-lg text-body-lg text-primary">${item.product.name}</h3>
            <button class="text-on-surface-variant hover:text-error remove-item" data-id="${item.productId}">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <p class="font-body-md text-body-md text-on-surface-variant mt-1">${item.product.material}</p>
        </div>
        <div class="flex justify-between items-end">
          <div class="flex items-center border border-outline-variant/30">
            <button class="px-3 py-2 text-primary hover:bg-surface-container qty-minus" data-id="${item.productId}">−</button>
            <span class="px-4 py-2 text-primary font-body-md qty-display">${item.quantity}</span>
            <button class="px-3 py-2 text-primary hover:bg-surface-container qty-plus" data-id="${item.productId}">+</button>
          </div>
          <span class="font-body-lg text-body-lg text-primary">$${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');

  const total = DB.getCartTotal();
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function renderCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const list = document.getElementById('drawer-items');
  const totalEl = document.getElementById('drawer-total');
  const countEl = document.getElementById('drawer-count');
  if (!drawer) return;

  const items = DB.getCartItems();

  if (items.length === 0) {
    list.innerHTML = `<div class="text-center py-12 text-on-surface-variant font-body-md">Your bag is empty</div>`;
    if (totalEl) totalEl.textContent = '$0.00';
    if (countEl) countEl.textContent = '0 items';
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="flex gap-4 py-4 border-b border-outline-variant/20">
      <div class="w-16 h-20 bg-surface-container-low overflow-hidden flex-shrink-0">
        <img class="w-full h-full object-cover" src="${item.product.image}" alt="${item.product.name}" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-body-md text-body-md text-primary truncate">${item.product.name}</h4>
        <p class="font-body-md text-body-md text-on-surface-variant">$${item.product.price.toFixed(2)}</p>
        <div class="flex items-center gap-2 mt-2">
          <button class="text-sm text-on-surface-variant hover:text-primary qty-minus-drawer" data-id="${item.productId}">−</button>
          <span class="text-sm text-primary">${item.quantity}</span>
          <button class="text-sm text-on-surface-variant hover:text-primary qty-plus-drawer" data-id="${item.productId}">+</button>
          <button class="ml-auto text-on-surface-variant hover:text-error remove-item-drawer" data-id="${item.productId}">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  const total = DB.getCartTotal();
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  if (countEl) countEl.textContent = `${items.length} item${items.length > 1 ? 's' : ''}`;
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
  }
  if (overlay) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
  }
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
  }
  if (overlay) {
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
  }
}

document.addEventListener('click', function (e) {
  if (e.target.closest('.add-to-cart')) {
    const btn = e.target.closest('.add-to-cart');
    const id = btn.dataset.id;
    const qty = parseInt(btn.dataset.qty || '1');
    DB.addToCart(id, qty);
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> Added';
    btn.classList.add('bg-primary', 'text-on-primary');
    btn.classList.remove('bg-primary/90', 'backdrop-blur-sm');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('bg-primary', 'text-on-primary');
      btn.classList.add('bg-primary/90', 'backdrop-blur-sm');
    }, 1500);
    openCartDrawer();
  }

  if (e.target.closest('.cart-toggle')) {
    e.preventDefault();
    const drawer = document.getElementById('cart-drawer');
    if (drawer && drawer.classList.contains('translate-x-0')) {
      closeCartDrawer();
    } else {
      openCartDrawer();
    }
  }

  if (e.target.closest('#cart-overlay')) {
    closeCartDrawer();
  }

  if (e.target.closest('.remove-item')) {
    const id = e.target.closest('.remove-item').dataset.id;
    DB.removeFromCart(id);
    renderCartItems();
    renderCartDrawer();
  }

  if (e.target.closest('.qty-minus')) {
    const id = e.target.closest('.qty-minus').dataset.id;
    const cart = DB.getCart();
    const item = cart.find(i => i.productId === id);
    if (item) DB.updateCartQuantity(id, item.quantity - 1);
    renderCartItems();
    renderCartDrawer();
  }

  if (e.target.closest('.qty-plus')) {
    const id = e.target.closest('.qty-plus').dataset.id;
    const cart = DB.getCart();
    const item = cart.find(i => i.productId === id);
    if (item) DB.updateCartQuantity(id, item.quantity + 1);
    renderCartItems();
    renderCartDrawer();
  }

  if (e.target.closest('.qty-minus-drawer')) {
    const id = e.target.closest('.qty-minus-drawer').dataset.id;
    const cart = DB.getCart();
    const item = cart.find(i => i.productId === id);
    if (item) DB.updateCartQuantity(id, item.quantity - 1);
    renderCartDrawer();
    DB.updateCartBadge();
  }

  if (e.target.closest('.qty-plus-drawer')) {
    const id = e.target.closest('.qty-plus-drawer').dataset.id;
    const cart = DB.getCart();
    const item = cart.find(i => i.productId === id);
    if (item) DB.updateCartQuantity(id, item.quantity + 1);
    renderCartDrawer();
    DB.updateCartBadge();
  }

  if (e.target.closest('.remove-item-drawer')) {
    const id = e.target.closest('.remove-item-drawer').dataset.id;
    DB.removeFromCart(id);
    renderCartDrawer();
    renderCartItems();
  }

  if (e.target.closest('.clear-cart')) {
    DB.clearCart();
    renderCartItems();
    renderCartDrawer();
  }
});
