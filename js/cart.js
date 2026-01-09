// ============================================
// CART FUNCTIONALITY
// ============================================

class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.init();
    }

    init() {
        this.updateUI();
    }

    // Load cart from localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('hydra_cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveToStorage() {
        localStorage.setItem('hydra_cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            // Product already in cart
            showToast('Este item já está no carrinho!', 'info');
            return;
        }

        this.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

        this.saveToStorage();
        this.updateUI();
        showToast(`${product.name} adicionado ao carrinho!`, 'success');

        // Open cart sidebar
        this.open();
    }

    // Remove item from cart
    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            const removed = this.items.splice(index, 1)[0];
            this.saveToStorage();
            this.updateUI();
            showToast(`${removed.name} removido do carrinho`, 'info');
        }
    }

    // Clear all items
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
    }

    // Get total price
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total items count
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Update all UI elements
    updateUI() {
        this.updateCount();
        this.updateCartItems();
        this.updateTotal();
        this.toggleEmptyState();
    }

    // Update cart count badge
    updateCount() {
        const countEl = document.getElementById('cart-count');
        if (countEl) {
            const count = this.getCount();
            countEl.textContent = count;
            countEl.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Update cart items list
    updateCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                </div>
                <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // Update total price
    updateTotal() {
        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            totalEl.textContent = formatPrice(this.getTotal());
        }
    }

    // Toggle empty state
    toggleEmptyState() {
        const emptyEl = document.getElementById('cart-empty');
        const footerEl = document.getElementById('cart-footer');
        const itemsEl = document.getElementById('cart-items');

        const isEmpty = this.items.length === 0;

        if (emptyEl) emptyEl.classList.toggle('hidden', !isEmpty);
        if (footerEl) footerEl.classList.toggle('hidden', isEmpty);
        if (itemsEl) itemsEl.style.display = isEmpty ? 'none' : 'flex';
    }

    // Open cart sidebar
    open() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close cart sidebar
    close() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle cart sidebar
    toggle() {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Toast notification function
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize cart
const cart = new Cart();

// Export
window.cart = cart;
window.showToast = showToast;
