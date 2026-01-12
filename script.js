// Scroll to section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Sample products
const products = [
    {id:1, name:"Kanjeevaram Silk Saree", price:4500, img:"https://images.unsplash.com/photo-1608232326390-b1fbe6f64eb4"},
    {id:2, name:"Mysore Silk Saree", price:5000, img:"https://images.unsplash.com/photo-1582053431825-0f0e49f6b7f6"},
    {id:3, name:"Tissue Silk Saree", price:3800, img:"https://images.unsplash.com/photo-1598878126455-8b16429fcf69"},
    {id:4, name:"Chiffon Silk Saree", price:3200, img:"https://images.unsplash.com/photo-1582720549382-1c2b0132e0e5"},
    {id:5, name:"Designer Silk Blouse", price:1200, img:"https://images.unsplash.com/photo-1593032465171-c50fa40dce07"},
    {id:6, name:"Silk Dress Material", price:2800, img:"https://images.unsplash.com/photo-1608232334245-1b2d8c5b6f11"},
];

// Render products
const productGrid = document.getElementById("product-grid");

products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
});

// Cart functionality
let cart = [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    if(cartItem){
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity:1});
    }
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("cart").style.display = "block";
    renderCartItems();
});

function closeCart() {
    document.getElementById("cart").style.display = "none";
}

function renderCartItems() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <p>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });
    document.getElementById("total-price").innerText = total;
}

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCartItems();
}

function checkout(){
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    updateCartCount();
    renderCartItems();
    closeCart();
}

// Contact Form
document.getElementById("contact-form").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    alert(`Thank you ${name}! Your message has been received.`);
    this.reset();
});
