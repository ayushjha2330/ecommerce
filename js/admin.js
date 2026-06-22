const ADMIN_PASSWORD = 'stitch123';

function isLoggedIn() {
  return sessionStorage.getItem('stitch_admin') === 'true';
}

function login(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('stitch_admin', 'true');
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('stitch_admin');
  window.location.href = 'admin.html';
}

function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-body');
  if (!tbody) return;
  const products = DB.getProducts();
  tbody.innerHTML = products.map(p => `
    <tr class="border-b border-outline-variant/30 hover:bg-surface-container-low">
      <td class="py-4 px-4">
        <div class="w-12 h-14 bg-surface-container-low overflow-hidden">
          <img class="w-full h-full object-cover" src="${p.image}" alt="${p.name}" />
        </div>
      </td>
      <td class="py-4 px-4 font-body-md text-primary">${p.name}</td>
      <td class="py-4 px-4 font-body-md text-on-surface-variant">${p.category}</td>
      <td class="py-4 px-4 font-body-md text-primary">$${p.price.toFixed(2)}</td>
      <td class="py-4 px-4">
        <span class="px-3 py-1 text-xs font-label-caps uppercase tracking-wider ${p.bestSeller ? 'bg-primary/10 text-primary' : 'bg-surface-variant text-on-surface-variant'}">${p.bestSeller ? 'Best Seller' : 'Standard'}</span>
      </td>
      <td class="py-4 px-4">
        <div class="flex gap-2">
          <button class="px-3 py-1.5 text-sm border border-outline-variant/30 text-primary hover:bg-surface-container edit-product-btn" data-id="${p.id}">
            <span class="material-symbols-outlined text-sm align-middle">edit</span> Edit
          </button>
          <button class="px-3 py-1.5 text-sm border border-outline-variant/30 text-error hover:bg-error/5 delete-product-btn" data-id="${p.id}">
            <span class="material-symbols-outlined text-sm align-middle">delete</span> Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showAddForm() {
  document.getElementById('form-title').textContent = 'Add New Product';
  document.getElementById('product-form').reset();
  document.getElementById('product-id').value = '';
  document.getElementById('product-modal').classList.remove('hidden');
  document.getElementById('product-modal').classList.add('flex');
}

function showEditForm(id) {
  const product = DB.getProduct(id);
  if (!product) return;
  document.getElementById('form-title').textContent = 'Edit Product';
  document.getElementById('product-id').value = product.id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-material').value = product.material;
  document.getElementById('product-description').value = product.description;
  document.getElementById('product-image').value = product.image;
  document.getElementById('product-bestseller').checked = product.bestSeller;
  document.getElementById('product-featured').checked = product.featured;
  document.getElementById('product-modal').classList.remove('hidden');
  document.getElementById('product-modal').classList.add('flex');
}

function hideForm() {
  document.getElementById('product-modal').classList.add('hidden');
  document.getElementById('product-modal').classList.remove('flex');
}

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('product-id').value;
  const data = {
    name: document.getElementById('product-name').value,
    price: parseFloat(document.getElementById('product-price').value),
    category: document.getElementById('product-category').value,
    material: document.getElementById('product-material').value,
    description: document.getElementById('product-description').value,
    image: document.getElementById('product-image').value,
    bestSeller: document.getElementById('product-bestseller').checked,
    featured: document.getElementById('product-featured').checked
  };

  if (!data.name || !data.price || !data.image) {
    alert('Please fill in name, price, and image URL');
    return;
  }

  if (id) {
    DB.updateProduct(id, data);
  } else {
    DB.addProduct(data);
  }

  hideForm();
  renderAdminProducts();
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    DB.deleteProduct(id);
    renderAdminProducts();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('admin.html')) {
    const app = document.getElementById('admin-app');
    const loginScreen = document.getElementById('admin-login');

    if (isLoggedIn()) {
      if (app) app.classList.remove('hidden');
      if (loginScreen) loginScreen.classList.add('hidden');
      renderAdminProducts();
    } else {
      if (app) app.classList.add('hidden');
      if (loginScreen) loginScreen.classList.remove('hidden');
    }
  }
});

document.addEventListener('click', function (e) {
  if (e.target.closest('#admin-login-btn')) {
    const password = document.getElementById('admin-password').value;
    if (login(password)) {
      document.getElementById('admin-app').classList.remove('hidden');
      document.getElementById('admin-login').classList.add('hidden');
      renderAdminProducts();
    } else {
      alert('Incorrect password. Try "stitch123"');
    }
  }

  if (e.target.closest('#admin-password')) {
    e.target.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') {
        document.getElementById('admin-login-btn').click();
      }
    });
  }

  if (e.target.closest('#add-product-btn')) {
    showAddForm();
  }

  if (e.target.closest('.edit-product-btn')) {
    showEditForm(e.target.closest('.edit-product-btn').dataset.id);
  }

  if (e.target.closest('.delete-product-btn')) {
    deleteProduct(e.target.closest('.delete-product-btn').dataset.id);
  }

  if (e.target.closest('#cancel-form')) {
    hideForm();
  }

  if (e.target.closest('#logout-btn')) {
    logout();
  }

  if (e.target.closest('#product-modal')) {
    if (e.target === e.target.closest('#product-modal')) {
      hideForm();
    }
  }
});
