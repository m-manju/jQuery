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
            loadingProducts();
            console.log('ajax',products);

            console.log($(window).height());
            console.log($(document).height());
            $(window).on('scroll', function() {
                if ($(window).scrollTop() + 1 >= $(document).height() - $(window).height()) {
                    loadingProducts();
                }
            });
        
            function loadingProducts() {
                const displayingProducts = products.slice(i, i + p);
                allProductsDisplay(displayingProducts);
                i += p;
                console.log('loadingProducts',products);
            }
            

            $('#searchInput').on('input', function() {
                allProductsDisplay(products);
                let searchText = $(this).val().toLowerCase();
                let showingProducts =0;
            
                $('.productDetail').each(function() {
                    let productName = $(this).find('h3').text().toLowerCase();
            
                    console.log(productName);
                    if (productName.includes(searchText)) {
                        $(this).show();
                        showingProducts += 1;
                    } else {
                        $(this).hide();
                    }
                });
            
                if (showingProducts === 0) {
                    $('.noMatches').show();
                    console.log("no matches")
                } else {
                    $('.noMatches').hide();
                    console.log("matches")
                }
            
            }); 
            

            $('#categoryFilter').on('change', function() {
                let CategoryFilter = $(this).val();
                console.log('CategoryFilter', CategoryFilter);
                
                let filteringByCatagory = [];
                if (CategoryFilter === 'all') {
                    filteringByCatagory = products;
                } else {
                    filteringByCatagory = products.filter(product =>
                        product.category === CategoryFilter);
                }
            
                allProductsDisplay(filteringByCatagory);
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
                productsDetails.empty();
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
                
        
                $('.cartBtn').on('click', function() {
                    let productTitle = $(this).siblings('h3').text();
                    let selectedProduct = products.find(product => 
                        product.title === productTitle);
                        console.log("Selected Product:", selectedProduct);
                    let existingCartItem = cartItems.find(item => 
                        item.title === productTitle);
        
                    if (existingCartItem) {
                        existingCartItem.quantity+=1;
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

                $('.cartItems').on('click', '.incrementBtn', function() {
                    let productTitle = $(this).siblings('.cartItemName').text();
                    let cartItem = cartItems.find(item => item.title === productTitle);
                    if (cartItem) {
                        cartItem.quantity+= 1;
                        CartProducts();
                    }
                });
            
                $('.cartItems').on('click', '.decrementBtn', function() {
                    let productTitle = $(this).siblings('.cartItemName').text();
                    let cartItem = cartItems.find(item => item.title === productTitle);
                    if (cartItem) {
                        if (cartItem.quantity > 1) {
                            cartItem.quantity -= 1;
                            CartProducts();
                        } else {
                            cartItems = cartItems.filter(item => item.title !== productTitle);
                            CartProducts();
                        }
                    }
                });           

                function CartProducts() {
        
                    $('.cartItems').empty();
                    cartTotal = 0;
                
                    cartItems.forEach(function(product) {
                        let cartItem = `
                            <li>
                                <span class="cartItemName">${product.title}</span>
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
                }   
            }
        }
    });   
});
