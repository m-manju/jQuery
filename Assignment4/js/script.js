$(document).ready(function() {
    let products = [];
    let cartItems = [];
    let cartTotal = 0;
    console.log(products);
    let i = 0;
    const p = 3; 

    $.ajax({
        url: 'https://dummyjson.com/products',
        method: 'GET',
        dataType: 'json',  
        success: function(data) {
            products = data.products; 
            loadMoreProducts();
            console.log('ajax',products);

            console.log($(window).height());
            console.log($(document).height());
            $(window).on('scroll', function() {
                if ($(window).scrollTop() + 1 >= $(document).height() - $(window).height()) {
                    loadMoreProducts();
                }
            });
        
            function loadMoreProducts() {
                const displayingProducts = products.slice(i, i + p);
                allProductsDisplay(displayingProducts);
                i += p;
                console.log('loadMoreProducts',products);
            }
            
            $('#categoryFilter').on('change', function() {
        
                let CategoryFilter = $(this).val();
                console.log('CategoryFilter',CategoryFilter);
        
                $('.productDetail').each(function() {
        
                    let productCategory = $(this).find('h5:contains("Category")').text().split(':')[1].trim();
                    console.log('productCategory',productCategory);
        
                    if (CategoryFilter === 'all' || productCategory === CategoryFilter) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                allProductsDisplay(products);
                
            });
            
            $('#searchInput').on('input', function() { 
                let searchText = $(this).val().toUpperCase();
        
                $('.productDetail').each(function() {
                    let productName = $(this).find('h3').text();
                    if (productName.includes(searchText)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                let presentProducts = $('.productDetail:visible').length;
        
                if (presentProducts === 0) {
                    $('.noMatches').show();
                } else {
                    $('.noMatches').hide();
                }
                
            });
        
        
            $('#sortPoints').on('change', function() {
                $('.allProducts').empty();
                let options = $(this).val();
        
                if(options === 'priceLowToHigh'){
                    products.sort(function(a, b) {
                        return a.price - b.price;
                    });
                    console.log(products);
                } else if(options === 'priceHighToLow'){
                    products.sort(function(a, b) {
                        return b.price - a.price;
                    });
                    console.log(products);
                } else if(options === 'rating'){
                    products.sort(function(a, b) {
                        return b.rating - a.rating;
                    });
                    console.log(products);
                }else {
                    console.log("nothing to display");
                }
        
                allProductsDisplay(products);
            });
        
        
            function allProductsDisplay(products) {
                let productsDetails = $('.allProducts');
                console.log('allProductsDisplay',products);
        
                products.forEach(function(product) {
                    let imageHere = product.images.map(function(image) {
                        return `<img src="${image}" alt="${product.title} Image">`;
                    });
        
                    let insertProducts = `
                        <div class="productDetail">
                          <div>
                            <h3>${product.title}</h3>
                            <h5>${product.description}</h5>
                            <p>Price: ${product.price}</p>
                            <h5>Discount Percentage: ${product.discountPercentage}</h5>
                            <h5>Rating: ${product.rating}</h5>
                            <h5>Stock: ${product.stock}</h5>
                            <h5>Brand: ${product.brand}</h5>
                            <h5>Category: ${product.category}</h5>
                            <button class="cartBtn">Add to Cart</button>
                          </div>
                            <figure class="imageContainer">
                                ${imageHere}
                            </figure>
                        </div>`;
        
                    productsDetails.append(insertProducts);  
                });
                
                productsDetails.on('click', '.cartBtn', function() {
        
                    let productTitle = $(this).siblings('h3').text();
                    console.log("Product Title:", productTitle);
                    let selectedProduct = products.find(product => 
                        product.title === productTitle);
                        console.log("Selected Product:", selectedProduct);
                    let existingCartItem = cartItems.find(item => 
                        item.title === productTitle);
        
                    if (existingCartItem) {
                        existingCartItem.quantity++;
                    } else {
                        cartItems.push({ 
                            title: selectedProduct.title, 
                            price: selectedProduct.price, 
                            discountPercentage: selectedProduct.discountPercentage,
                            quantity: 1 
                        });
                    }
        
                    CartProducts();
                });
                
        
                function CartProducts() {
        
                    $('.cartItems').empty();
                    cartTotal = 0;
                
                    cartItems.forEach(function(product) {
                        let cartItem = `
                            <li>
                                <span class="cartItemName">${product.title}</span>
                                <span class="cartItemPrice">${product.price}</span>
                                <button class="decrementBtn">-</button>
                                <span class="cartItemQuantity">${product.quantity}</span>
                                <button class="incrementBtn">+</button>
                            </li>
                        `;
                
                        $('.cartItems').append(cartItem);
                
                        let productPrice = parseInt(product.price);
                        let productTotal = productPrice * product.quantity;
                        console.log(productPrice);
                        cartTotal += productTotal;
                    });
                
                    $('.cartTotal').text(cartTotal);
                    
                    $('.incrementBtn').click(function (e) {
                        e.preventDefault();
                        var increValue = $(this).siblings('.cartItemQuantity').text();
                        var value = parseInt(increValue);
                        if (value < 10) {
                            value += 1;
                            $(this).siblings('.cartItemQuantity').text(value);
                        }
                    });
                
                    $('.decrementBtn').click(function (e) {
                        e.preventDefault();
        
                        var decreValue = $(this).siblings('.cartItemQuantity').text();
                        var value = parseInt(decreValue);
                        if (value > 0) {
                            value -= 1;
                            $(this).siblings('.cartItemQuantity').text(value);
                        }
                
                        if (value === 0) {
                            $(this).closest('li').remove(); 
                        }
        
                    });
                }
            }
        }
   });   
});