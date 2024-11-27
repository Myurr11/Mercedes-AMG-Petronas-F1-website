    document.addEventListener("DOMContentLoaded", function () {
        const cart = document.getElementById('cart');
        const cartContent = document.querySelector('.cart-content');
        const closeCartBtn = document.querySelector('.close');
        const addToCartBtns = document.querySelectorAll('.add-to-cart-button'); // Updated selector
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPrice = document.getElementById('total-price');
        const cartIcon = document.getElementById('cart-icon');
        let cartItems = [];
        let total = 0;

        // Cart icon click event
        cartIcon.addEventListener('click', toggleCart);

        // Add event listeners for "Add to Cart" buttons
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', addToCart);
        });

        closeCartBtn.addEventListener('click', toggleCart);

        function addToCart(event) {
            const item = event.target.closest('.grid-item');
            const itemName = item.querySelector('.item-name').textContent;
            const itemPrice = parseFloat(item.querySelector('.item-price').textContent.replace('RS. ', ''));
            const itemImage = item.querySelector('img').src; // Get the image URL
            const cartItem = { name: itemName, price: itemPrice, image: itemImage, quantity: 1 }; // Include quantity
            const existingItem = cartItems.find(item => item.name === cartItem.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(cartItem);
            }
            total += itemPrice;
            displayCartItems();
            updateTotal();
        }

        function removeFromCart(event) {
            const itemIndex = parseInt(event.target.dataset.index);
            const removedItem = cartItems.splice(itemIndex, 1)[0];
            total -= removedItem.price * removedItem.quantity;
            displayCartItems();
            updateTotal();
        }

        function updateQuantity(event) {
            const itemIndex = parseInt(event.target.dataset.index);
            const action = event.target.dataset.action;
            if (action === 'increase') {
                cartItems[itemIndex].quantity++;
                total += cartItems[itemIndex].price;
            } else if (action === 'decrease' && cartItems[itemIndex].quantity > 1) {
                cartItems[itemIndex].quantity--;
                total -= cartItems[itemIndex].price;
            }
            displayCartItems();
            updateTotal();
        }

        function displayCartItems() {
            cartItemsContainer.innerHTML = '';
            cartItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('cart-item');

                const itemImage = document.createElement('img');
                itemImage.src = item.image;
                itemImage.alt = item.name;
                itemImage.classList.add('cart-item-image');
                li.appendChild(itemImage);

                const itemDetails = document.createElement('div');
                itemDetails.classList.add('cart-item-details');

                const itemName = document.createElement('span');
                itemName.textContent = item.name;
                itemName.classList.add('item-name');
                itemDetails.appendChild(itemName);

                const itemPrice = document.createElement('span');
                itemPrice.textContent = `RS. ${item.price * item.quantity}`;
                itemPrice.classList.add('item-price');
                itemDetails.appendChild(itemPrice);

                const quantityContainer = document.createElement('div');
                quantityContainer.classList.add('quantity-container');

                const decreaseBtn = document.createElement('button');
                decreaseBtn.textContent = '-';
                decreaseBtn.classList.add('quantity-button');
                decreaseBtn.dataset.action = 'decrease';
                decreaseBtn.dataset.index = index;
                decreaseBtn.addEventListener('click', updateQuantity);
                quantityContainer.appendChild(decreaseBtn);

                const quantityDisplay = document.createElement('span');
                quantityDisplay.textContent = item.quantity;
                quantityDisplay.classList.add('quantity-display');
                quantityContainer.appendChild(quantityDisplay);

                const increaseBtn = document.createElement('button');
                increaseBtn.textContent = '+';
                increaseBtn.classList.add('quantity-button');
                increaseBtn.dataset.action = 'increase';
                increaseBtn.dataset.index = index;
                increaseBtn.addEventListener('click', updateQuantity);
                quantityContainer.appendChild(increaseBtn);

                itemDetails.appendChild(quantityContainer);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-button');
                removeBtn.dataset.index = index;
                removeBtn.addEventListener('click', removeFromCart);
                itemDetails.appendChild(removeBtn);

                li.appendChild(itemDetails);
                cartItemsContainer.appendChild(li);
            });
        }

        function updateTotal() {
            totalPrice.textContent = `Total: RS. ${total}`;
        }

        function toggleCart() {
            cart.classList.toggle('show-cart');
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.addEventListener('click', checkout);

        function checkout() {
            // Add your checkout logic here
            alert('Implement checkout functionality');
        }
    });
