// ============================================
// MAIN JAVASCRIPT - HYDRA RP STORE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1500);

    // Initialize all components
    initHeader();
    initProducts();
    initCategoryFilter();
    initCart();
    initVIPButtons();
    initCounters();
    initSmoothScroll();
});

// ============================================
// HEADER
// ============================================
function initHeader() {
    const header = document.querySelector('.header');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// PRODUCTS
// ============================================
function initProducts() {
    renderProducts('all');
}

function renderProducts(category) {
    const container = document.getElementById('products-grid');
    if (!container) return;

    const products = getProductsByCategory(category);

    container.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'hot' ? '🔥 Popular' : '✨ Novo'}</span>` : ''}
            </div>
            <div class="product-content">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price-wrapper">
                        ${product.oldPrice ? `<span class="product-price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <button class="btn-add-cart" onclick="cart.addItem('${product.id}')" title="Adicionar ao carrinho">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Animate cards
    const cards = container.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function getCategoryLabel(category) {
    const labels = {
        vip: '👑 VIP',
        veiculo: '🚗 Veículo',
        item: '📦 Item',
        pacote: '🎁 Pacote'
    };
    return labels[category] || category;
}

// ============================================
// CATEGORY FILTER
// ============================================
function initCategoryFilter() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter products
            const category = btn.dataset.category;
            renderProducts(category);
        });
    });
}

// ============================================
// CART EVENTS
// ============================================
function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartShopBtn = document.getElementById('cart-shop-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => cart.toggle());
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => cart.close());
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => cart.close());
    }

    if (cartShopBtn) {
        cartShopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cart.close();
            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                showToast('Seu carrinho está vazio!', 'error');
                return;
            }

            // Simulate checkout
            showToast('Redirecionando para pagamento...', 'info');

            setTimeout(() => {
                alert(`🎮 SIMULAÇÃO DE CHECKOUT\n\n` +
                    `Total: ${formatPrice(cart.getTotal())}\n` +
                    `Itens: ${cart.getCount()}\n\n` +
                    `Em produção, você seria redirecionado para o Mercado Pago/Pix.\n\n` +
                    `Este é apenas um DEMO!`);
            }, 500);
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.close();
        }
    });
}

// ============================================
// VIP BUTTONS
// ============================================
function initVIPButtons() {
    const vipButtons = document.querySelectorAll('.btn-vip');

    vipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            if (productId) {
                cart.addItem(productId);
            }
        });
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (target > 1000) {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
