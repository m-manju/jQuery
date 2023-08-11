$(document).ready(function() {

    $('#searchInput').on('input', function() { 
        let searchText = $(this).val().toUpperCase();
        $('.group').each(function() {
            let productName = $(this).find('h3').text();
            if (productName.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        let visibleProducts = $('.group:visible').length;
        if (visibleProducts === 0) {
            $('.noMatches').show();
        } else {
            $('.noMatches').hide();
        }
    });

    let cartItems = []; 
    $('.group button').click(function() {
        let itemName = $(this).siblings('h3').text();
        let itemPrice = parseInt($(this).siblings('p').text());
        let existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        updateCartDisplay();
    });
    
    $('.cartItems').on('click', '.incrementBtn', function() {
        let itemName = $(this).parent().find('.cartItemName').text();
        let item = cartItems.find(item => item.name === itemName);
        item.quantity++;
        updateCartDisplay();
    });
    $('.cartItems').on('click', '.decrementBtn', function() {
        let itemName = $(this).parent().find('.cartItemName').text();
        let item = cartItems.find(item => item.name === itemName);
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cartItems = cartItems.filter(item => item.name !== itemName);
        }
        updateCartDisplay();
    });
    
    function updateCartDisplay() {
        $('.cartItems').empty();
        let cartTotal = 0;
        cartItems.forEach(function(item) {
            let cartItem = `
                <li>
                    <span class="cartItemName">${item.name}</span>
                    <button class="decrementBtn">-</button>
                    <span class="cartItemQuantity">${item.quantity}</span>
                    <button class="incrementBtn">+</button>
                </li>
            `;
            $('.cartItems').append(cartItem);
            cartTotal += item.price * item.quantity;
        });
        $('.cartTotal').text(cartTotal);
    }
});


