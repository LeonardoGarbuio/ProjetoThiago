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
        badge: 'new',
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
    {
        id: 'moto-hayabusa',
        name: 'Suzuki Hayabusa',
        category: 'veiculo',
        description: 'A moto mais rápida do servidor. Fuja de qualquer perseguição.',
        price: 69.90,
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop',
        badge: null,
        featured: false
    },

    // Itens
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

// Export for use in other files
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
window.formatPrice = formatPrice;
