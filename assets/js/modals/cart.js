//■■■■■ Shop modal ■■■■■

export const setEventListenerModalCart = (btnCart) => {

    const cartContainer = document.getElementById("cart-container");

    const btnCloseCart = document.getElementById("btn-cart-close");

    btnCart.addEventListener("click", () => {

        // Check if the cart menu already exists
        if (cartContainer.classList.contains("d-none")) {

            //show cart
            cartContainer.classList.remove("d-none");
    
        } else {
            //hide cart
            cartContainer.classList.add("d-none");
        }
        
    });

    btnCloseCart.addEventListener("click", () => {
        cartContainer.classList.add("d-none");
    });

    //key Esc event for hiding cart
    document.addEventListener("keydown", function(event) {
    
        //check if cart is opened
        if (!(cartContainer.classList.contains("d-none"))) {

            //close modal on Esc key pressed
            if (event.key === "Escape" || event.key === "Esc") {
                //hide cart
                cartContainer.classList.add("d-none");
            }
        }
    });
}

export const setModalCart = async(userData, productList, inStock) => {

    const cartContainer = document.getElementById("cart-container");
    const cartContent = document.getElementById("cart-items");

    const cartsubtotal = document.querySelector("#cart-subtotal span");
    const cartNumberOfItems = document.getElementById("cart-total-items");
    const navBarNumberOfItems = document.getElementsByClassName("navbar-cart-total-items");

    let cartTemplate = "";
    let subtotal = 0;
    let totalQuantityOfItems = 0;

    //check if shopping cart has products
    if (userData.cart.length === 0) {
        cartTemplate = 
        `   
            <p> Tu carrito está vacio </p>
        `
    } else {

        //erase precious cart content
        cartContent.innerHTML = "";

        //iterate through all products in the shopping cart
        for (let item of userData.cart) {

            //proper parse of elements in the array
            let itemData = JSON.parse(item[0]);
            let itemQuantity = parseInt(item[1]);

            //check that productList is valid
            if (productList) {

                //iterate through productList
                for (let product of productList) {

                    //check if any of the products are present in the array
                    if (product.id === itemData.productId) {

                        //check if product is currently available in inventory
                        let stockStatus = await inStock(product.id, itemData);
  
                        cartTemplate +=
                        `
                        <article id="cart-card-product" class="rowToCol" data-available=${stockStatus}  data-productid=${product.id} data-size=${itemData.size} data-color=${itemData.color.replaceAll(" ","-")}>

                            <a href=${product.link}>
                                <img src=${product.image[0]} alt="">
                            </a>
                        
                            <div id="cart-card-product-info">
                        
                                <a href=${product.link}>
                                    <h2> ${product.name} </h2>
                                </a>
                        
                                <h4> Talle: ${itemData.size} </h4>
                                <h4> Color: ${itemData.color} </h4> 
                                <p> ${itemQuantity} x $ ${product.price} </p>
                                <p style=${stockStatus ? "color:green" : "color:red"}> ${stockStatus ? "En Stock" : "Sin Stock"} </p>
                                
                                <p class="btn-cart-delete-product"> 
                                    <i class='bx bxs-trash'></i>
                                    <span> Eliminar </span>
                                </p>
                            </div>
                        
                        </article>
                        `

                        //if the product is available add its price and quantity
                        if (stockStatus) {
                            
                            //change subtotal of the shopping cart
                            subtotal += itemQuantity*parseFloat(product.price);

                            //add number of items to the total number of items
                            totalQuantityOfItems += itemQuantity;
                        } 
                    }
                }
            }
        }
    }

    //change number of items in the shopping cart
    cartNumberOfItems.innerText = "(" + totalQuantityOfItems + ")" ;
    
    for (const numberDisplay of navBarNumberOfItems) {
        numberDisplay.innerText = totalQuantityOfItems;
    }

    //change content and subtotal of the shopping cart
    cartContent.innerHTML = cartTemplate;
    cartsubtotal.innerText = subtotal;

    //set event listener for delete product from cart button
    if (!(userData.cart.length === 0) && document.getElementsByClassName("btn-cart-delete-product")) {

        const btnDeleteProductFromCart = document.getElementsByClassName("btn-cart-delete-product");

        // New map cart with their quantities
        let cart = new Map(userData.cart);

        for (const btn of btnDeleteProductFromCart) {

            btn.addEventListener("click", () => {
            
                //get productId from parent element dataset
                let parentElement = btn.closest("[data-productid]");

                //set product element to compare to cart map element's keys
                let productData = {
                    productId: parseInt((parentElement).dataset.productid),
                    size: (parentElement).dataset.size,
                    color: ((parentElement).dataset.color).replaceAll("-"," "),
                }

                //parse object product into string version for comparision with keys
                let productString = JSON.stringify(productData);

                //check if product is in map object
                if (cart.has(productString)) {

                    //get quantity of the product
                    let currentValue = parseInt(cart.get(productString));

                    //check if quantity is positive
                    currentValue > 1 ?

                        //reduce one the quantity of the product from user object's shopping cart
                        cart.set(productString, currentValue - 1)
                    :
                        //delete product from user object's shopping cart
                        cart.delete(productString);

                    //set user's shopping car as the array with quantity
                    userData.cart = Array.from(cart.entries());

                    //dispatch event to update screen and value of session cart
                    window.dispatchEvent(new Event('itemDeletedFromCart'));
                }
            });
        }
    }
}