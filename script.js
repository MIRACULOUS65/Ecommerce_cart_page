document.addEventListener('DOMContentLoaded', ()=> {
    const products = [
        {id: 1,name: 'Product 1',price: 29.99},
        {id: 2,name: 'Product 2',price: 19.99},
        {id: 3,name: 'Product 3',price: 59.99}
    ];

    const cart=[]
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    products.forEach(product => {
       const productDiv = document.createElement('div');
       productDiv.classList.add("product");
       productDiv.innerHTML = `
       <span>${product.name} - $${product.price.toFixed(2)}</span>
       <button data-id="${product.id}">Add to cart</button>`;

       productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        }
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.appendChild(emptyCartMessage);
            cartTotalMessage.classList.add('hidden');
        } else {
            emptyCartMessage.remove();
            cartTotalMessage.classList.remove('hidden');
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button data-id="${item.id}" class="remove-btn">Remove</button>
                `;
                cartItems.appendChild(cartItemDiv);
            });
            updateTotal();
        }
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
    }

    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            updateCartDisplay();
        }
    }

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Checkout successful! Total: ${totalPriceDisplay.textContent}`);
            cart.length = 0;
            updateCartDisplay();
        } else {
            alert('Your cart is empty!');
        }
    });
});



