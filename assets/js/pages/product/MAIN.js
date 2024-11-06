import { getStockOfProductOrderedBySize } from "../../utils/products.js";

export const displaySingleProductPage = async(product, container, userData = {}) => {

    //final template storage
    let template = "";
    let tagsTemplate = "";
    let ratingTemplate = "";

    //add product's info into literal template

        //set rating template
        switch (parseFloat(product.rating)) {
            
            case 5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star' ></i>`
                break;
            
            case 4.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half' ></i>`
                break;        
            
            case 4:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>`
                break;       
            
            case 3.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;        
            
            case 3:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 2.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 2:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 1.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 1:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star-half'></i>`
                break;

            case 0.5:
                ratingTemplate = 
                `<i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            default:
                ratingTemplate = 
                `<i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star-half'></i>`
                break;
        }

        let tagColor = "";

        //set tags template
        (product.tags).forEach(tag => {

            //set proper bg color of tag
            switch (tag) {
                case "Nuevo":
                    tagColor="--tag-color-new";
                    break;
                case "Oferta":
                    tagColor="--tag-color-discount";
                    break;
                case "Oferta especial":
                    tagColor="--tag-color-special";
                    break;
                default:
                    tagColor="white";
                    break;
            }

            tagsTemplate += `<a href="#tienda/productos/${(tag).toLowerCase()}">
                                <span class="product-tag" style="background-color:var(${tagColor})">
                                    <h5> ${tag} </h5>
                                </span>
                            </a>`;
        });

        //set category with mayus on first letter
        let category = (((product.categories[0]).charAt(0)).toUpperCase()) + (product.categories[0]).slice(1);

        //set preview images template
        let previewImagesColumnTemplate = "";

        (product.image).forEach(image => {

            previewImagesColumnTemplate += 
            `
                <img src="${image}" class="preview-thumbnail">
            `;
        
        });

        //get stock info for sizes available
        const stockOfProductOrderedBySize = await getStockOfProductOrderedBySize(product.id);

        //template for sizes options
        let templateSizesOption = "";

        //template for colors options
        let templateColorsOption = "";
        
        //btns for available colors
        let btnColors;

        //flag for iteration
        let i = 0;
        
        //set sizes options template
        stockOfProductOrderedBySize.forEach((size) => {

            // Check if any item of that size is in stock
            let isInStock = (size.stock).some(product => product.in_stock);

            //change size code into size letter
            let sizeLetter;

            switch (size.size) {
                case 1:
                    sizeLetter = "XS";
                break;

                case 2:
                    sizeLetter = "S";
                break;

                case 3:
                    sizeLetter = "L";
                break;

                case 4:
                    sizeLetter = "XL";
                break;
            }

            //assign template for sizes if any product of that size is in stock
            if (isInStock) {

                //if it is the first iteration, select it
                if(i === 0){

                    templateSizesOption += 
                    `
                        <div class="product-stock-info-size" data-size=${size.size} data-selected> ${sizeLetter} </div>
                    `;

                    //set template to all available colors
                    size.stock.forEach(product => {

                        //if product is in stock, show all the color options
                        if (product.in_stock) {

                            templateColorsOption +=
                            `
                                <div class="product-stock-info-color" style="background-color:${product.code}" data-stock="${product.quantity}" data-color="${product.color}"></div>
                            `;
                        }

                    });

                    //btns for available colors
                    btnColors = document.getElementsByClassName("product-stock-info-color");

                    //increase flag once first iteration is over
                    i++;

                }else{
                    templateSizesOption += 
                    `
                        <div class="product-stock-info-size" data-size=${size.size}> ${sizeLetter} </div>
                    `;
                }
            } else {
                //if not in stock, show the size in gray with no interaction available
                templateSizesOption += 
                `
                    <div class="product-stock-info-size" style="cursor:none; pointer-events: none; user-select: none; filter:brightness(50%);" data-size=${size.size}> ${sizeLetter} </div>
                `;
            }

        });

        //add filled product's template into variable
        template = `
        
            <div id="product-page-container" class="flex d-col" data-product="${product.id}" data-aos="fade-up" data-aos-offset="50" data-aos-duration="2000">
        
                <section id="product-page-info"  class="flex rowToCol">
                    
                    <article id="product-images">

                        <div id="product-images-column"> 
                            ${previewImagesColumnTemplate}
                        </div>

                        <div id="product-images-selected"> 
                        
                            <a href=${product.image[0]} target="_blank">
                                <img id="product-page-image" class="preview-image" src= ${product.image[0]} data-src=${product.image[0]} loading="lazy" alt="${product.name}">
                            </a>

                        </div>

                    </article>

                    <article id="product-details">

                        <div class="inline-navigation-bar">
                            <p> 

                                <a href="#tienda">
                                    Tienda / 
                                </a>

                                <a href="#tienda/productos">
                                    Productos / 
                                </a>

                                <a href="#tienda/productos/${category}">
                                    ${category} / 
                                </a>

                                <span> ${product.name} </span>

                            </p>
                        </div>

                        <div class="product-tags">
                            ${tagsTemplate}
                        </div>

                        <h2> ${product.name} </h2>

                        <p id="product-page-description"> ${product["description-cover"]} </p>

                        <div id="product-stock-info">

                            <div class="flex col">
                                
                                <h5> Talle </h5>

                                <div>
                                    ${templateSizesOption}
                                </div>

                            </div>

                            <div class="flex col">
                                
                                <h5> Color </h5>

                                <div id="product-stock-info-colors">
                                    ${templateColorsOption}
                                </div>

                            </div>

                        </div>

                        <div class="flex col">

                            <p id="product-add-to-cart-display-quantity"></p>

                            <div id="product-add-to-cart-container">
                                    
                                <input type="number" id="product-add-to-cart-quantity" name="quantity" value="1" min="1" max="100">

                                <button class="form-btn" id="btn-cart-add">
                                    <i class='bx bxs-cart-add'></i>
                                    Añadir al carrito
                                </button>

                            </div>
                        
                        </div>

                        <div class="product-container-favs-rating">
                            <div class="product-favorite">
                                <span> Añadir a favoritos </span> ${product.favorite ? "<i class='bx bxs-heart'></i>" :  "<i class='bx bx-heart'></i>" }
                            </div>
                            
                            <div class="product-rating">
                                <span> Confiabilidad: </span> ${ratingTemplate}
                            </div>
                        </div>

                    </article>

                </section>
        
            </div>
    
        `;

    //set product page template into container
    container.innerHTML = template;

    //set event listeners

        //add to shopping cart button
        let btnAddToCart = document.getElementById("btn-cart-add");

        btnAddToCart.addEventListener("click", () => {

            let selectedSize = document.querySelector(".product-stock-info-size[data-selected]");
            let selectedColor = document.querySelector(".product-stock-info-color[data-selected]");

            //check if size and color is selected
            if (selectedSize && selectedColor) {

                // New map cart with their quantities
                let cart = new Map(userData.cart);

                //set item object with productId, size and color
                let item = 
                {
                    productId: product.id,
                    size: selectedSize.innerText,
                    color: selectedColor.dataset.color
                }

                //set quantity to add of the product selected into the shopping cart
                let quantityToAdd = cartQuantityToAdd ? parseInt(cartQuantityToAdd.value) : 1;

                //set quantity of the product already inside the cart
                let quantityInCart = 0;
                if(cart.get(JSON.stringify(item))){
                    quantityInCart = parseInt(cart.get(JSON.stringify(item)));
                }

                //maximum amount of units available of that product
                let maxStock = selectedColor.dataset.stock;

                //check if the sum is less or equal to the stock available
                if(quantityToAdd + quantityInCart <= maxStock){

                    //function to add a product into the cart with its proper quantity
                    function addItemMapWithQuantity(map, product, quantity) {

                        //parse object product into string version for comparision with keys
                        let productAsString = JSON.stringify(product);

                        //if the product matches any key of the map element of the cart with quantity
                        if (map.has(productAsString)) {
                            
                            // If the product is already in the cart, update the quantity
                            const currentQuantity = parseInt(map.get(productAsString));
                            map.set(productAsString, currentQuantity + quantity);
                        } else {
                            // If the product is not in the cart, add it with the given quantity
                            map.set(productAsString, quantity);
                        }
                    }
                    
                    //compare the productId, size and color of each product inside the cart, to group the identical ones
                    addItemMapWithQuantity(cart, item, quantityToAdd);

                    //set user's shopping car as the array with quantity
                    userData.cart = Array.from(cart.entries());

                    //dispatch event to update screen
                    window.dispatchEvent(new Event('itemAddedToCart'));
                }else{

                    //toast notification for failure
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: false,
                        didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: `¡No puede superar el limite disponible!`
                    });
                }
            }else{

                //toast notification for failure
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: `¡Antes debe seleccionar la talla y color deseado!`
                });
            }
        });

        //product image toggle with thumbnail images
        let previewThumbnails = document.getElementsByClassName("preview-thumbnail");
        let previewImage = document.querySelector(".preview-image");

        for (const thumbnail of previewThumbnails) {

            let thumbnailSrc = thumbnail.src;

            //change the source of the preview image to the thumbnail's source
            thumbnail.addEventListener("click", () => {
                previewImage.src = thumbnailSrc;
                //change the href of the a so it opens the new image when clicked
                (previewImage.parentElement).href = thumbnailSrc;
            });
        }

        //product sizes to show available colors
        const btnSizes = document.getElementsByClassName("product-stock-info-size");
        //container of color btns
        const containerColors = document.getElementById("product-stock-info-colors");
        //quantity container and btn
        const containerQuantity = document.getElementById("product-add-to-cart-display-quantity");
        const cartQuantityToAdd = document.getElementById("product-add-to-cart-quantity");

        //iterate all sizes buttons
        for (const btn of btnSizes) {
            
            //event listener to set all the colors options for that size on click
            btn.addEventListener("click", () => {

                //remove selected dataset from selected size and select current size
                setBtnAsSelected(btn, btnSizes);

                //clean template color from previous colors
                templateColorsOption = "";

                //erase the quantity available for the last product
                containerQuantity.innerText = "";

                //get size id from dataset of btn
                let sizeId = parseInt(btn.dataset.size);

                //check all sizes of the product for that size data
                stockOfProductOrderedBySize.forEach(size => {

                    if (size.size === sizeId) {
                        
                        //set template to all available colors
                        size.stock.forEach(product => {

                            //if product is in stock, show the option for that color
                            if (product.in_stock) {
                                templateColorsOption +=
                                `
                                    <div class="product-stock-info-color" style="background-color:${product.code}" data-stock="${product.quantity}" data-color="${product.color}"></div>
                                `
                            }

                        });

                        //display template of color's options
                        containerColors.innerHTML = templateColorsOption;
                    }
                });

                //btns for available colors
                btnColors = document.getElementsByClassName("product-stock-info-color");

                if (btnColors.length !== 0) {

                    //iterate all color buttons
                    for (const btn of btnColors) {

                        //remove previous event listeners to avoid unstable behaviour
                        btn.removeEventListener("click", setBtnAsSelected);
        
                        //event listener for all color buttons 
                        btn.addEventListener("click", () => {
                            //remove selected dataset from selected color and select current color
                            setBtnAsSelected(btn, btnColors);
                            //display the quantity available for that product
                            containerQuantity.innerText = 
                            `
                                ${btn.dataset.stock > 1 ? btn.dataset.stock + " disponibles" : "¡" + btn.dataset.stock + " disponible!"} 
                            `

                            //set maximum value for number field
                            if ( cartQuantityToAdd.value > btn.dataset.stock ) {
                                cartQuantityToAdd.value = btn.dataset.stock;
                            }
                            //maximum items available in stock for max value in number field
                            cartQuantityToAdd.max = btn.dataset.stock;
                        });
                    }
                }

            });
        }

        //This event listener is outside size btns eventListener for the case where size btn is not clicked
            //iterate all color buttons
            for (const btn of btnColors) {
                //event listener for all color buttons 
                btn.addEventListener("click", () => {

                    //remove selected dataset from selected color and select current color
                    setBtnAsSelected(btn, btnColors);
                    //display the quantity available for that product
                    containerQuantity.innerText = 
                    `
                        ${btn.dataset.stock > 1 ? btn.dataset.stock + " disponibles" : "¡" + btn.dataset.stock + " disponible!"}
                    `

                    //set maximum value for number field
                    if ( cartQuantityToAdd.value > btn.dataset.stock ) {
                        cartQuantityToAdd.value = btn.dataset.stock;
                    }
                    //maximum items available in stock for max value in number field
                    cartQuantityToAdd.max = btn.dataset.stock;
                });
            }

        //function to set only a targeted btn from a collection with the dataset-selected
        function setBtnAsSelected(btnSelected, ElementsByClassCollection) {
        
            //remove selected dataset from selected color
            for (const btn of ElementsByClassCollection){
                btn.hasAttribute("data-selected") && btn.removeAttribute("data-selected");
            }
            
            //add dataset selected to this btn size
            btnSelected.dataset.selected = "";
        }
}