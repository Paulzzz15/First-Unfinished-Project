    let navbar = document.querySelector('.navbar');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');
    let cartContainer = document.querySelector('.cart-items-container');
    let checkoutButton = document.createElement('a'); // Dynamic checkout button
    let closeButtons = document.querySelectorAll('.fa-times');

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Close the cart item or perform any action here
        let cartItem = e.target.closest('.cart-item');
        cartItem.remove();
    });
});

    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };
    

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        cartItem.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };

    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };

    

    // Handle "Add to Cart" functionality for menu items
    const cart = [];
    const addToCartButtons = document.querySelectorAll('.menu .btn');
    

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const item = {
                name: button.previousElementSibling.previousElementSibling.textContent,
                price: parseFloat(button.previousElementSibling.textContent.replace('₱', '')),
                image: button.parentElement.querySelector('img').src,
            };

            cart.push(item);
            updateCart();
        });
    });

    // Handle "Add to Cart" functionality for shopping cart icons
    const productCartIcons = document.querySelectorAll('.products .fa-shopping-cart');

    productCartIcons.forEach((icon) => {
        icon.addEventListener('click', (event) => {
            const productBox = event.target.closest('.box');
            const item = {
                name: productBox.querySelector('h3').textContent,
                price: parseFloat(productBox.querySelector('.price').textContent.replace('₱', '')),
                image: productBox.querySelector('img').src,
            };

            cart.push(item);
            updateCart();
        });
    });

    // Update the cart dynamically
    function updateCart() {
        cartContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="fas fa-times" onclick="removeItem(${index})"></span>
                <img src="${item.image}" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">₱${item.price.toFixed(2)}</div>
                </div>
                <div class="product-quantity">
                    <button>
                    -
                    </button>
                    <input type="text" value="1"/>
                    <button>
                    +
                    </button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        if (cart.length > 0) {
            const totalPrice = calculateTotal();
            checkoutButton.href = '#';
            checkoutButton.className = 'btn';
            checkoutButton.textContent = `Checkout Now - ₱${totalPrice.toFixed(2)}`;
            cartContainer.appendChild(checkoutButton);
        } else {
            checkoutButton.href = '#';
            checkoutButton.className = 'btn';
            checkoutButton.textContent = 'Your Cart is Empty';
            cartContainer.appendChild(checkoutButton);
        }
    }

    // Calculate the total price of all items in the cart
    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    // Remove item from cart
    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Handle Checkout
    checkoutButton.addEventListener('click', function () {
        if (cart.length > 0) {
            const totalPrice = calculateTotal();
            alert(`Proceeding to checkout. Total amount: ₱${totalPrice.toFixed(2)}`);
            cart.length = 0; // Clears the cart after checkout
            updateCart();
        } else {
            alert("Your cart is empty! Please add items to your cart before proceeding.");
        }
    });

    document.addEventListener('click', (e) => {
    if (e.target.closest('.product-quantity button')) {
        const button = e.target;
        const input = button.parentElement.querySelector('input[type="text"]');

        let currentValue = parseInt(input.value, 10);
        if (isNaN(currentValue)) currentValue = 1; // Default value if input is not a number

        if (button.textContent.trim() === '+') {
            input.value = currentValue + 1;
        } else if (button.textContent.trim() === '-' && currentValue > 1) {
            input.value = currentValue - 1;
        }
    }
});


