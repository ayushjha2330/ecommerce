function renderBestSellers() {
  const container = document.getElementById('best-sellers-grid');
  if (!container) return;
  const products = DB.getProducts().filter(p => p.bestSeller);
  renderProducts(container, products);
}

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-grid');
  if (!container) return;
  const products = DB.getProducts().filter(p => p.featured);
  renderProducts(container, products);
}

function renderAllProducts() {
  const container = document.getElementById('all-products-grid');
  if (!container) return;
  const products = DB.getProducts();
  renderProducts(container, products);
}

function renderProducts(container, products) {
  container.innerHTML = products.map(p => `
    <div class="group fade-in-up">
      <div class="relative aspect-[3/4] mb-4 bg-surface-container-low overflow-hidden luxury-border">
        <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="w-10 h-10 bg-surface-container-lowest text-primary rounded-full flex items-center justify-center ambient-shadow hover:bg-primary hover:text-on-primary transition-colors">
            <span class="material-symbols-outlined">favorite</span>
          </button>
        </div>
        <div class="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button class="w-full py-3 bg-primary/90 backdrop-blur-sm text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary transition-colors add-to-cart" data-id="${p.id}" data-qty="1">
            Quick Add
          </button>
        </div>
      </div>
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-body-lg text-body-lg text-primary mb-1">
            <a href="product.html?id=${p.id}" class="hover:text-secondary transition-colors">${p.name}</a>
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant">$${p.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderShopGrid() {
  const container = document.getElementById('shop-products-grid');
  if (!container) return;
  const products = DB.getProducts();

  container.innerHTML = products.map((p, i) => {
    const spans = ['md:col-span-8', 'md:col-span-4', 'md:col-span-6', 'md:col-span-6'];
    const marginMod = (i === 1) ? 'md:mt-32' : '';
    const aspect = (i === 0) ? 'aspect-[4/5]' : (i === 1 ? 'aspect-[3/4]' : 'aspect-square');
    const titleClass = (i === 0) ? 'font-headline-lg text-headline-lg' : 'font-body-lg text-body-lg font-medium';
    return `
    <article class="col-span-1 ${spans[i % spans.length]} group cursor-pointer flex flex-col gap-4 ${marginMod}">
      <div class="relative w-full ${aspect} bg-surface-container-lowest overflow-hidden">
        <a href="product.html?id=${p.id}">
          <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${p.image}" alt="${p.name}" loading="lazy" />
        </a>
        <button class="absolute top-4 right-4 text-on-primary bg-primary/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary add-to-cart" data-id="${p.id}" data-qty="1">
          <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
        </button>
      </div>
      <div class="flex justify-between items-start pt-2">
        <div>
          <h3 class="${titleClass} text-primary leading-tight"><a href="product.html?id=${p.id}" class="hover:text-secondary transition-colors">${p.name}</a></h3>
          <p class="font-body-md text-body-md text-on-surface-variant mt-1">${p.material}</p>
        </div>
        <span class="font-body-lg text-body-lg text-primary">$${p.price.toFixed(2)}</span>
      </div>
    </article>`;
  }).join('');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const container = document.getElementById('product-detail');
  if (!container) return;

  if (!id) {
    container.innerHTML = '<div class="text-center py-24"><p class="font-body-lg text-on-surface-variant">Product not found.</p></div>';
    return;
  }

  const product = DB.getProduct(id);
  if (!product) {
    container.innerHTML = '<div class="text-center py-24"><p class="font-body-lg text-on-surface-variant">Product not found.</p></div>';
    return;
  }

  document.title = `${product.name} | STITCH`;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
      <div class="relative aspect-[4/5] bg-surface-container-low overflow-hidden">
        <img class="absolute inset-0 w-full h-full object-cover" src="${product.image}" alt="${product.name}" />
      </div>
      <div class="flex flex-col justify-center">
        <span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">${product.category}</span>
        <h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-6">${product.name}</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">${product.description}</p>
        <div class="flex items-center gap-4 mb-8">
          <span class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary">$${product.price.toFixed(2)}</span>
          <span class="font-body-md text-body-md text-on-surface-variant">${product.material}</span>
        </div>
        <div class="flex items-center gap-4 mb-10">
          <div class="flex items-center border border-outline-variant/30">
            <button class="px-4 py-3 text-primary hover:bg-surface-container" id="detail-qty-minus">−</button>
            <span class="px-6 py-3 text-primary font-body-md" id="detail-qty">1</span>
            <button class="px-4 py-3 text-primary hover:bg-surface-container" id="detail-qty-plus">+</button>
          </div>
        </div>
        <button class="w-full py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary/90 transition-colors mb-4 add-to-cart" data-id="${product.id}" data-qty="1" id="detail-add-btn">
          Add to Bag
        </button>
        <button class="w-full py-4 bg-transparent border border-outline-variant/30 text-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-surface-container transition-colors">
          <span class="material-symbols-outlined text-sm align-middle">favorite</span> Add to Wishlist
        </button>
        <div class="mt-10 pt-10 border-t border-outline-variant/30">
          <div class="flex gap-8 font-body-md text-body-md text-on-surface-variant">
            <div><span class="text-primary font-medium">Material:</span> ${product.material}</div>
            <div><span class="text-primary font-medium">Category:</span> ${product.category}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('detail-qty-minus')?.addEventListener('click', () => {
    const el = document.getElementById('detail-qty');
    let qty = parseInt(el.textContent);
    if (qty > 1) {
      qty--;
      el.textContent = qty;
      document.getElementById('detail-add-btn').dataset.qty = qty;
    }
  });

  document.getElementById('detail-qty-plus')?.addEventListener('click', () => {
    const el = document.getElementById('detail-qty');
    let qty = parseInt(el.textContent);
    qty++;
    el.textContent = qty;
    document.getElementById('detail-add-btn').dataset.qty = qty;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderBestSellers();
  renderFeaturedProducts();
  renderAllProducts();
  renderShopGrid();
  renderProductDetail();
  DB.updateCartBadge();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});
