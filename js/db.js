const DB = {
  init() {
    if (!localStorage.getItem('stitch_products')) {
      this.seed();
    }
    if (!localStorage.getItem('stitch_cart')) {
      localStorage.setItem('stitch_cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('stitch_orders')) {
      localStorage.setItem('stitch_orders', JSON.stringify([]));
    }
  },

  seed() {
    const products = [
      {
        id: 'prod_1', name: 'The Crimson Rose', price: 45, category: 'Crochet Flora',
        material: 'Organic Cotton', description: 'A single, striking crochet red rose. Each petal is meticulously handcrafted to capture nature\'s elegance.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLrP8d0Ya2jqmkQYvFM87I6B6CyYwng7kNVlsEZfWVowCr11KoySX4h7OWirxy3StzGjpIP-y3ZXldZDauodyiD-OWN4ZrMzOUclaSP-ha2VRcqW2SSRt6pAjlCr_-ymGX_jvonG7TNmyd-ikOguHyXDc5-a8kCIH23wzS6Wn56swDFJWEZtYlHPC4m948dzjgIIjAh3BXVq1Cr1GDpEJlM6Ys0AdzFZt8BtVbCahy6h_6xksurCbgqCa-Vi9h4JuBV8XY2ocLwEE',
        bestSeller: true, featured: false, dateAdded: Date.now() - 1000000
      },
      {
        id: 'prod_2', name: 'The Pastel Meadow Bouquet', price: 120, category: 'Crochet Flora',
        material: 'Linen Blend', description: 'A lush bouquet of mixed crochet flowers in pastel hues—blush pink, soft lavender, and creamy white.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAflM-upNJirX9xt-ekby2OHhIPv0wnoMB4udRB650UvCfiz4b-Zn2ZMGmjCrXfqsWSV7OEIUbQdUSQFWV0j_NaoQ81Zn89PGXvVfUkSdHDcfl1SSZ1PNTdNo0XiCBLchP-4NQsS7sqIEdxkisbmRIg0cpHD4lbLGkgJC_-bFM7uJX3O3q1Ey_OTXVn3r72L-HjFh5qU0JdaRZ6DphpSmTQb_4le5nt3-bUgW-zgguuytTnIx36ZsE33cG352LzdedU4jjkCYsnUY',
        bestSeller: true, featured: false, dateAdded: Date.now() - 2000000
      },
      {
        id: 'prod_3', name: 'The Heritage Bear', price: 85, category: 'Artisan Bears',
        material: 'Merino Wool', description: 'A minimalist, neutral-toned crochet teddy bear made of high-quality oat-colored merino wool.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAACE13Qd4eYrRwFeUmYFs95LumnvcCBb2j-OpEhTaelTeERiDcd8SKK96Wk2NWY9uHOaKPfXx6W1bQF0SENXeeTaROIIDsdc2NaEPlXHcL_icJuxRKGEdogqI5A3zSM5AamCUE8yIRlf6vc9OYFD4tI-GUkYeYa9nzluCHWrXdg2GQnq2JJxPUv6G50I5V9eua4lnmi_aVSpi516RYNoQsWKXcVlvckmrlh9_Rq1u6h6t4sCk0B62fgSfcw86FB9kClcUk_lHnsbo',
        bestSeller: true, featured: false, dateAdded: Date.now() - 3000000
      },
      {
        id: 'prod_4', name: 'The Lily Box Set', price: 95, category: 'Curated Hampers',
        material: 'Organic Cotton', description: 'An elegant gift box with a pristine white crochet lily and a delicate personalized gift note inside.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWpiXeGHWAdXfMiyWk-cVAIvh-IHe0Zkyt_SB3foLIuPw2JsSVyUShFLKIe8H7zNMxaGMVPUgp7wbxZVzvcC9UxV4ShigGUoqWB0rHO5JINW0pxoDSHxF4RPoSOWE1kmNNbfiGE0Sa5emdDXIcRhfzZJAGt3lAdFUfctSwa2t5W818h0lMx48EdIvinEL6EMfzt0wUakAfsT5sqPcOYICAr0Kw8H08GCVt6CICFChWapXfnfANxNZ9uZ27osl1hB6ihuJe8dxgIoQ',
        bestSeller: true, featured: false, dateAdded: Date.now() - 4000000
      },
      {
        id: 'prod_5', name: 'The Alba Bouquet', price: 245, category: 'Crochet Flora',
        material: 'Organic Cotton & Silk Blend', description: 'An exquisite handcrafted crochet flower bouquet on a stark white marble plinth.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU6sIkIBMiNd8XHkA-IdxMPn3KQ8obAAqPcBbHB6SQ4_n9E08EKECRurcHKa0it_DmXsiq2OqtQD0ySE2p8DdH5fMtxW9r4LIP_3w-s5KajbFZjLT85EbT_mvyNJdYNusZ0lE5is5lqSVs-MOOcuMDJkqR3LvTF9jtU1gDK-uGCVrNJMwUxj_bKCCpmAOIZrzW1IFhT43bUfNOCGX_-Rl4CcBZBhMgr25BPpxfWX0Z7aQyKpVEbYEIrFzm-GvTmujLRFS3aLneGxw',
        bestSeller: false, featured: true, dateAdded: Date.now() - 5000000
      },
      {
        id: 'prod_6', name: 'Ursus Heirloom', price: 180, category: 'Artisan Bears',
        material: 'Merino Wool', description: 'A bespoke sculptural bear styled as a premium collectible for the modern interior.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nwvCU90_28lby_VMB8lGkSxaPMaXYp_qhlBDKSZ2iZRtJGhbKGu-0u9h9u1ivwBfekEpbMspH1AY9I9U-_94lqh_opFCNW_DsO7Hjed2AmTspmYvIltN3eP7bt-PiMphw3CfOFaH7RUkWDiQJ8_TKRpTpwTAaNCjVtJk9_-evZ3D4biW4R6q6Qo-iiKdjoVN_7GUuyAWxfabAtESwBcZXfcILNG0orsSWQ1WsODM2ngrXsSyogyFjiVIjeVC_rmPtROGq4xXQeU',
        bestSeller: false, featured: false, dateAdded: Date.now() - 6000000
      },
      {
        id: 'prod_7', name: 'The Atelier Hamper', price: 320, category: 'Curated Hampers',
        material: 'Curated Selection', description: 'A luxury gifting hamper with handcrafted crochet flowers and natural skincare items.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzEtLmSFTSw-bY_5794NFeCSfqedJYdbKvHlg1G3SHKXvFDmx-OzhY6zEPo-UAuB6HojRRkNvD41K4Rm1OTkvaBe1yuLoAMeAZhzCyzTUVK3m0YVmoJd9WH-yqepYbJLp_Yr2krDmiWRiJgrj964DGowvaSzjstzcpJR2ShinUx3-R8uFrL8Rt-cfK2KR7KMETjLEEJ1Wr6NqoUVQTDC5x9YfLRxIKgBxe6DfvqKy10NnxwMpqyNBZtlaoCvS8m4FxeK6PaAjKbk8',
        bestSeller: false, featured: true, dateAdded: Date.now() - 7000000
      },
      {
        id: 'prod_8', name: 'Solitary Rose', price: 95, category: 'Crochet Flora',
        material: 'Silk Blend', description: 'A striking single handcrafted crochet rose on reflective obsidian - high-end jewelry for your space.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIfRXO06C0HmOdSpCUMbWzinxuJj5XNSjvq2PRw-v_R9OlLHSozHqxo40v98q8IWCAvRA5RT3erEi69k8zWClf9Eg1uTvvznK6MhDaDSIoLgrZYW3DGh6cYKHxBTaUrsAhWv25Ut9_2Uizxu1-AgFE9KRgES9zCB8KeRuqAHGWpgCL6k-8yxWIGIdSg3rOwmmQSHXW-Q2rxLAW9lWKbxDol6IMIWaiF0GDtup-gvcwEQGbmUJR5pt92IfFp99dyIl4E7gHoQ0REtg',
        bestSeller: false, featured: false, dateAdded: Date.now() - 8000000
      },
      {
        id: 'prod_9', name: 'Signature Rose Bouquet', price: 175, category: 'Crochet Flora',
        material: 'Organic Cotton', description: 'Our signature bouquet featuring vibrant textured yarn roses in deep reds and soft pinks.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86FYxyXp371wc1U4sLHaANdI9mPA5qz6gDVngHL1Iq199b-UPEVUhFGeolYIfBF1TCPjQfUeQnmTXFehXMO0yHotRXDYy2H2UtUGgFJQI3ml0tD6TF9h3B2G8qg6t0L3w6f8gLDFRVDx3alC6esdWlgMAURAilDp4xlG0g0NRhZNtbZnIvpm2bl4HjXM_rs5CM-1GxAabvV4Abkc1uzBLp0dhhJw2LoeT8ubN3k_gwxbnQvHbtlfD5Ovekk8IdtPriH0b4insD8g',
        bestSeller: false, featured: true, dateAdded: Date.now() - 9000000
      }
    ];
    localStorage.setItem('stitch_products', JSON.stringify(products));
  },

  getProducts() {
    return JSON.parse(localStorage.getItem('stitch_products') || '[]');
  },

  getProduct(id) {
    return this.getProducts().find(p => p.id === id);
  },

  addProduct(product) {
    const products = this.getProducts();
    product.id = 'prod_' + Date.now();
    product.dateAdded = Date.now();
    products.push(product);
    localStorage.setItem('stitch_products', JSON.stringify(products));
    return product;
  },

  updateProduct(id, updates) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...updates };
    localStorage.setItem('stitch_products', JSON.stringify(products));
    return products[idx];
  },

  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem('stitch_products', JSON.stringify(products));
  },

  getCart() {
    return JSON.parse(localStorage.getItem('stitch_cart') || '[]');
  },

  saveCart(cart) {
    localStorage.setItem('stitch_cart', JSON.stringify(cart));
  },

  getCartCount() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    this.saveCart(cart);
    this.updateCartBadge();
  },

  removeFromCart(productId) {
    const cart = this.getCart().filter(item => item.productId !== productId);
    this.saveCart(cart);
    this.updateCartBadge();
  },

  updateCartQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      item.quantity = quantity;
      this.saveCart(cart);
    }
    this.updateCartBadge();
  },

  clearCart() {
    localStorage.setItem('stitch_cart', JSON.stringify([]));
    this.updateCartBadge();
  },

  getCartTotal() {
    const cart = this.getCart();
    const products = this.getProducts();
    return cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  getCartItems() {
    const cart = this.getCart();
    const products = this.getProducts();
    return cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);
  },

  updateCartBadge() {
    const count = this.getCartCount();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  placeOrder(orderDetails) {
    const orders = JSON.parse(localStorage.getItem('stitch_orders') || '[]');
    const order = {
      id: 'ORD-' + Date.now(),
      items: this.getCartItems(),
      total: this.getCartTotal(),
      details: orderDetails,
      date: new Date().toISOString(),
      status: 'confirmed'
    };
    orders.push(order);
    localStorage.setItem('stitch_orders', JSON.stringify(orders));
    this.clearCart();
    return order;
  }
};
