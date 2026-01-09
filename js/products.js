// ============================================
// PRODUCTS DATA - FiveM Server Store
// ============================================

const PRODUCTS = [
    // VIPs
    {
        id: 'vip-bronze',
        name: 'VIP Bronze',
        category: 'vip',
        description: 'Benefícios iniciais para começar sua jornada no servidor.',
        price: 29.90,
        image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },
    {
        id: 'vip-gold',
        name: 'VIP Gold',
        category: 'vip',
        description: 'O plano mais popular! Carros exclusivos e casa grátis.',
        price: 59.90,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
        badge: 'hot',
        featured: true
    },
    {
        id: 'vip-diamond',
        name: 'VIP Diamond',
        category: 'vip',
        description: 'Máximo poder! Todos os benefícios e acesso antecipado.',
        price: 99.90,
        image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },

    // Veículos
    {
        id: 'car-lamborghini',
        name: 'Lamborghini Aventador',
        category: 'veiculo',
        description: 'Supercarro italiano. Velocidade máxima incomparável.',
        price: 149.90,
        oldPrice: 199.90,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
        badge: 'hot',
        featured: true
    },
    {
        id: 'moto-cyber',
        name: 'Neon Cyber Cycle',
        category: 'veiculo',
        description: 'Motocicleta futurista com rodas de luz LED e propulsão elétrica.',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1622185135505-2d795043df6e?w=400&h=300&fit=crop',
        badge: 'new',
        featured: true
    },
    {
        id: 'car-ferrari',
        name: 'Ferrari 488 GTB',
        category: 'veiculo',
        description: 'Elegância e potência em um só carro. Motor V8 turbo.',
        price: 129.90,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },
    {
        id: 'car-bmw',
        name: 'BMW M4 Competition',
        category: 'veiculo',
        description: 'Performance alemã. Perfeito para rachas e fugas.',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },
    {
        id: 'car-porsche',
        name: 'Porsche 911 Turbo S',
        category: 'veiculo',
        description: 'Lenda das pistas. Aceleração brutal de 0-100 em 2.7s.',
        price: 139.90,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },

    // Itens
    {
        id: 'item-hacker',
        name: 'Cyber Deck mk.IV',
        category: 'item',
        description: 'Interface de hacking avançada. Desbloqueie qualquer porta.',
        price: 59.90,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
        badge: 'rare',
        featured: true
    },
    {
        id: 'item-armas-pack',
        name: 'Pack de Armas',
        category: 'item',
        description: 'Kit completo com pistolas, rifles e munição inicial.',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },
    {
        id: 'item-jetpack',
        name: 'Jetpack Experimental',
        category: 'item',
        description: 'Propulsor pessoal para voos curtos. Domine os céus.',
        price: 199.90,
        image: 'https://images.unsplash.com/photo-1469037784699-75dcff1cbf75?w=400&h=300&fit=crop',
        badge: 'new',
        featured: true
    },
    {
        id: 'aircraft-specter',
        name: 'Specter Stealth Jet',
        category: 'veiculo',
        description: 'Caça invisível ao radar. Domine o espaço aéreo.',
        price: 499.90,
        image: 'https://images.unsplash.com/photo-1559416568-18544ed39638?w=400&h=300&fit=crop',
        badge: 'legendary',
        featured: true
    },
    {
        id: 'item-nanobots',
        name: 'Nanobot Medkit',
        category: 'item',
        description: 'Cura automática e regeneração progressiva por 24h.',
        price: 29.90,
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop',
        badge: 'tech',
        featured: false
    },
    {
        id: 'item-casa-luxo',
        name: 'Casa de Luxo',
        category: 'item',
        description: 'Mansão com garagem para 10 carros e piscina.',
        price: 199.90,
        oldPrice: 299.90,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
        badge: 'hot',
        featured: true
    },
    {
        id: 'item-dinheiro-500k',
        name: 'R$ 500.000 In-Game',
        category: 'item',
        description: 'Meio milhão em dinheiro para gastar como quiser.',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },
    {
        id: 'item-dinheiro-1m',
        name: 'R$ 1.000.000 In-Game',
        category: 'item',
        description: 'Um milhão! Compre carros, casas e armas sem preocupação.',
        price: 44.90,
        image: 'https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=400&h=300&fit=crop',
        badge: 'new',
        featured: false
    },

    // Pacotes
    {
        id: 'pack-starter',
        name: 'Pack Iniciante',
        category: 'pacote',
        description: 'VIP Bronze + R$200k + Carro básico. Perfeito pra começar!',
        price: 49.90,
        oldPrice: 79.90,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
        badge: 'hot',
        featured: true
    },
    {
        id: 'pack-pro',
        name: 'Pack Profissional',
        category: 'pacote',
        description: 'VIP Gold + R$1M + Ferrari + Casa média. Domine o servidor!',
        price: 149.90,
        oldPrice: 249.90,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },
    {
        id: 'pack-ultimate',
        name: 'Pack Ultimate',
        category: 'pacote',
        description: 'TUDO! VIP Diamond + R$5M + 3 Carros + Mansão. Seja o rei!',
        price: 299.90,
        oldPrice: 499.90,
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
        badge: 'hot',
        featured: true
    }
];

// Get product by ID
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

// Format price to BRL
function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// RENDER FUNCTION
function renderShop(filter = 'todos') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let items = PRODUCTS;
    if (filter !== 'todos') {
        // Simple mapping: 'carros' -> 'veiculo', 'vip' -> 'vip' etc
        // logic from previous files implies:
        if (filter === 'carros') items = items.filter(p => p.category === 'veiculo');
        else if (filter === 'vip') items = items.filter(p => p.category === 'vip');
        else if (filter === 'dinheiro') items = items.filter(p => p.category === 'item' && p.name.includes('Dinheiro')); // Heuristic
        else items = items.filter(p => p.category === filter); // Fallback
    }

    grid.innerHTML = items.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<div class="product-badge badge-${product.badge}">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="btn-add-cart" onclick="cart.addItem('${product.id}')">
                        Adicionar <i class="fas fa-shopping-cart"></i>
                    </button>
                    ${product.oldPrice ? `<div class="discount-tag">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</div>` : ''}
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <div class="price-block">
                        ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                        <span class="price">${formatPrice(product.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


// Export for use in other files
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
window.formatPrice = formatPrice;
window.renderShop = renderShop;

// Initialize Tilt Effect after DOM Load (helper)
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderShop('todos');

    // Filter Listeners (assuming buttons exist)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            renderShop(filter);

            // Visual Active State
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Wait for grid to be populated
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Rotate X (up/down) - inverted
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            // Rotate Y (left/right)
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
    });

    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    });
});
