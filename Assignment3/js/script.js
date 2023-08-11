$(document).ready(function() {

    $('#searchInput').on('input', function() { 
        var searchText = $(this).val().toLowerCase();
        $('.group').each(function() {
            var productName = $(this).find('h3').text().toLowerCase();
            if (productName.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        var visibleProducts = $('.group:visible').length;
        if (visibleProducts === 0) {
            $('.noMatches').show();
        } else {
            $('.noMatches').hide();
        }
    });

    var cartItems = []; 
    $('.group button').click(function() {
        var itemName = $(this).siblings('h3').text();
        var itemPrice = parseInt($(this).siblings('p').text());
        var existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        updateCartDisplay();
    });
    
    $('.cartItems').on('click', '.incrementBtn', function() {
        var itemName = $(this).parent().find('.cartItemName').text();
        var item = cartItems.find(item => item.name === itemName);
        item.quantity++;
        updateCartDisplay();
    });
    $('.cartItems').on('click', '.decrementBtn', function() {
        var itemName = $(this).parent().find('.cartItemName').text();
        var item = cartItems.find(item => item.name === itemName);
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cartItems = cartItems.filter(item => item.name !== itemName);
        }
        updateCartDisplay();
    });
    
    function updateCartDisplay() {
        $('.cartItems').empty();
        var cartTotal = 0;
        cartItems.forEach(function(item) {
            var cartItem = `
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


