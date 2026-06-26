// ===== ECOMMERCE =====
const Ecommerce = {
    products: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, emoji: '🎧', inStock: true },
        { id: 2, name: 'Smart Watch', price: 149.99, emoji: '⌚', inStock: true },
        { id: 3, name: 'USB-C Hub', price: 39.99, emoji: '🔌', inStock: false },
        { id: 4, name: 'Mechanical Keyboard', price: 89.99, emoji: '⌨️', inStock: true }
    ],
    cart: [],

    init() {
        this.renderProducts();
        this.renderCart();
        this.setupCartListener();
    },

    renderProducts() {
        const container = document.getElementById('productGrid');
        if (!container) return;

        container.innerHTML = this.products.map(product => `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div style="margin-bottom:8px;font-size:13px;color:${product.inStock ? '#22c55e' : '#ef4444'};">
                        ${product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                    </div>
                    <button class="btn btn-primary" 
                            onclick="Ecommerce.addToCart(${product.id})"
                            ${!product.inStock ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                        ${product.inStock ? 'Add to Cart 🛒' : 'Unavailable'}
                    </button>
                </div>
            </div>
        `).join('');
    },

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || !product.inStock) return;

        const existing = this.cart.find(c => c.id === productId);
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.renderCart();
        this.updateCartTotal();
    },

    renderCart() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `<div style="color:var(--text-secondary);text-align:center;padding:20px;">🛒 Your cart is empty</div>`;
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-color);">
                <div>
                    <span style="font-weight:500;">${item.emoji} ${item.name}</span>
                    <span style="color:var(--text-secondary);font-size:14px;margin-left:8px;">x${item.quantity}</span>
                </div>
                <div>
                    <span style="font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button onclick="Ecommerce.removeFromCart(${item.id})" 
                            style="margin-left:12px;background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">
                        ✕
                    </button>
                </div>
            </div>
        `).join('');
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(c => c.id !== productId);
        this.renderCart();
        this.updateCartTotal();
    },

    updateCartTotal() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const container = document.getElementById('cartTotal');
        if (container) {
            container.textContent = `Total: $${total.toFixed(2)}`;
        }
    },

    setupCartListener() {
        // Listen for cart changes from other parts
    },

    checkout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`✅ Order placed successfully! Total: $${this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
        this.cart = [];
        this.renderCart();
        this.updateCartTotal();
    }
};