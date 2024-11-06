export const adminProductsPageContent = async(container, userRole, fetchData, postFetch, deleteFetch,
    redirectToPage, formInput, validationStatus, setOnChangeValidationForInput,  
    minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, areValuesEqual, passwordValidation
) => {

    if (userRole !== 999) {

        //if user is not allowed to access redirect to main page and deny further code
        redirectToPage("", 1);
        return null;
    }

    //function to parse the categories/tags fields
    const parseProductData = (product) => {
        product.image_url = product.image_url.replace(/['\[\]]/g, ' ');
        product.tags = product.tags.replace(/['\[\]]/g, ' ');
        product.categories = product.categories.replace(/['\[\]]/g, ' ');

        // Trim any leading or trailing spaces (optional but recommended)
        product.image_url = product.image_url.trim();
        product.tags = product.tags.trim();
        product.categories = product.categories.trim();

        return product;
    };

    //function to parse the JSON images fields
    const parseProductImagesData = (product) => {
        product.image_url = product.image_url.replace(/'/g, '"');

        // Split image_url string into array
        product.image_url = product.image_url.split(',');

        return product;
    };

    //function to fetch and display the product list table
    let displayProductsList = async(currentPage = 1, size = 4, field = "id") => {

        //fetch of product list
        let productsPath = "http://localhost:8080/productos/todos?sort=" + field + "&size=" + size + "&page=" + (currentPage - 1);
        let productsFetch = await fetchData(productsPath, "products");

        //relevant data of products fetch
        let products = productsFetch["content"];
        let pages = productsFetch["totalPages"];
        let totalElements = productsFetch["totalElements"];

        //parsing JSON fields inside product data
        let parsedProducts = products.map(parseProductData);
        parsedProducts = products.map(parseProductImagesData);

        //Table template
        let productsListTemplate =
        `<table width="100%" cellpadding="10">
                <thead>
                    <tr>
                        <th scope="col"> Imagen </th>
                        <th scope="col"> Nombre </th>
                        <th scope="col"> Precio ($) </th>
                        <th scope="col"> Desc. (%) </th>
                        <th scope="col"> Categorías </th>
                        <th scope="col"> Etiquetas </th>
                        <th scope="col"> País </th>
                        <th scope="col"> Material </th>
                        <th scope="col" class="table-options"> 
                            <i class='bx bx-edit'></i> 
                        </th>
                    </tr>
                </thead>
                <tbody>`;

        
        //Footer with pagination buttons for each page
        let paginationFooter = "";
        for (let index = 1; index <= pages; index++) {

            //if currentPage is equal to page id of btn set data-active
            index == currentPage ? 
            paginationFooter+=
            `<span class="pagination-btn" id="page-${index}" data-page="${index}" data-active>${index}</span>`
            :
            paginationFooter+=
            `<span class="pagination-btn" id="page-${index}" data-page="${index}">${index}</span>`;
        }

        //Main td template for each product
        for (const product of parsedProducts) {

            productsListTemplate+= 
            `<tr data-id="${product.id}" data-productName=" ${product.name}">
                <td> <img src=${product.image_url[0]} alt=""> </td>
                <td style="width:max(9vmax, 9rem);"> ${product.name} </td>
                <td> ${product.price} </td>
                <td> ${product.discount} </td>
                <td> ${product.categories} </td>
                <td> ${product.tags} </td>
                <td> ${product.from_country} </td>
                <td> ${product.material} </td>
                <td>
                    <i class='bx bxs-x-square btnNewProductDelete' ></i>
                </td>
            </tr>`;
        }

        productsListTemplate+= 
        `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="9"> ${paginationFooter} </td>
                </tr>
            </tfoot>
        </table>`;

        let template = `
            
            <!-- Wavy separator -->
            <svg style="margin: -5px 0px;" width="100%" height="100%" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                <!-- Modify last value of viewBox to modify its margin on the Y axis -->
                <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
                stroke="#9b58da" stroke-width="0px" stroke-opacity="0.5" fill="rgb(67, 75, 82)" fill-opacity="1" 
                class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
            </svg> 

            <div class="w-100">

                <button class="form-btn" id="btn-admin-product-section-show">
                    Agregar producto
                </button>

                <div class="col" data-aos="zoom-in"  data-aos-offset="100" data-aos-duration="2000">

                    <form id="admin-product-section-form" class="container-form d-none">

                        <div class="col w-100">

                            <p id="errorAdminNewProduct" class="error d-none" style="margin:auto;"></p>
                            <div class="container-empty-img">
                                <img id="newProductImg" src="./assets/resources/img/blank-image-placeholder.png" alt="product picture">
                                <span class="message-over-image"> "Sube fotos del producto" </span>
                            </div>
                        </div>

                        <div class="col w-100">

                            ${formInput("newProductName", "errorNameProfileForm", "name", "Nombre", "Ingrese el nombre del producto")}

                            ${formInput("newProductPrice", "errorPriceForm", "price", "Precio", "Ingrese el precio del producto")}

                            ${formInput("newProductDiscount", "errorDiscountForm", "discount", "Descuento", "Ingrese el descuento del producto")}

                            ${formInput("newProductMaterial", "errorMaterialForm", "material", "Material", "Ingrese el material del producto")}

                            ${formInput("newProductFromCountry", "errorFromCountryForm", "from_country", "País", "Ingrese el país de origen")}

                            ${formInput("newProductDescription", "errorDescriptionForm", "description", "Descripcion", "Ingrese la descripcion del producto")}

                            <!-- Hidden input fields -->
                            <input type="hidden" id="newProductRating" name="rating" value=0 />
                            <input type="hidden" id="newProductTags" name="tags" value="['Nuevo']" />
                            <input type="hidden" id="newProductCategories" name="categories" value="['Otoñal']" />
                            <input type="hidden" id="newProductImageUrl" name="image_url" value="['./assets/resources/img/blank-image-placeholder.png']" />
                            <input type="hidden" id="newProductLinks" name="links" value="['#tienda/producto/chaquetas/chaqueta-ligera']" />

                        </div>

                        <input type="submit" class="form-btn" id="btn-admin-product-section-submit" value="Agregar producto">

                    </form>

        </div>
            </div>

            <div class="w-100">

                <div class="container-table">

                    ${productsListTemplate}
                </div>
            </div>

            <!-- Wavy separator -->
            <div style="background-color:var(--logo-bg-color)">
                <svg style="background-color: rgb(67, 75, 82); margin-bottom: 0px;" width="100%" height="100%" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                    <!-- Modify last value of viewBox to modify its margin on the Y axis -->
                    <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
                    stroke="#9b58da" stroke-width="0px" stroke-opacity="0.5" fill="rgb(224, 187, 228)" fill-opacity="1" 
                    class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
                </svg> 
            </div>
        `

        container.innerHTML = template;

        //validations for new product input fields

        let isValidName = setOnChangeValidationForInput("newProductName", "errorNameProfileForm",
        minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual);
        
        let isValidPrice = setOnChangeValidationForInput("newProductPrice", "errorPriceForm",
        minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual);
        
        let isValidDiscount = setOnChangeValidationForInput("newProductDiscount", "errorDiscountForm",
        minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual);
    
        let isValidMaterial = setOnChangeValidationForInput("newProductMaterial", "errorMaterialForm",
        minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual);

        let isValidCountry = setOnChangeValidationForInput("newProductFromCountry", "errorFromCountryForm",
        minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual);

        let isValidDescription = setOnChangeValidationForInput("newProductDescription", "errorDescriptionForm",
        minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual);
            
        //set eventlisteners

        //pagination buttons

            //iterate through the child elements of the container
            const paginationBtns = document.querySelectorAll(".pagination-btn");

            paginationBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    paginationBtns.forEach(b => b.removeAttribute("data-active"));
                    currentPage = parseInt(btn.getAttribute("data-page"));
                    displayProductsList(currentPage);
                });
            });
        
        //delete product button

            let btnsDeleteProduct = document.getElementsByClassName("btnNewProductDelete");

            for (const btn of btnsDeleteProduct) {

                btn.addEventListener("click", async() => {

                    let productRow = btn.closest("tr");
                    let productId = productRow.getAttribute("data-id");
    
                    Swal.fire({
                        title: "¿Borrar producto?",
                        text: "¡Este cambio será permanente!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Borrar",
                        cancelButtonText: "Cancelar"
                      }).then(async(result) => {
                        if (result.isConfirmed) {

                            try {

                                //delete request
                                let deletePath = "http://localhost:8080/productos/borrar?id=" + productId;
                                let res = await deleteFetch(deletePath);

                                if (res.ok) {

                                    displayProductsList();

                                    Swal.fire({
                                        title: "¡Producto eliminado!",
                                        text: "El producto fue borrado del catalogo con exito.",
                                        icon: "success"
                                    });

                                } else {
                                    //Toast notification for failure
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "bottom-end",
                                        showConfirmButton: false,
                                        timer: 3800,
                                        timerProgressBar: false,
                                        didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer;
                                        toast.onmouseleave = Swal.resumeTimer;
                                        }
                                    });
                                    Toast.fire({
                                        icon: "error",
                                        title: `¡No se pudo borrar el producto!`
                                    });
                                }

                                
                            } catch (error) {
                                //Toast notification for failure
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "bottom-end",
                                    showConfirmButton: false,
                                    timer: 3800,
                                    timerProgressBar: false,
                                    didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: "error",
                                    title: `¡No se pudo borrar el producto!`
                                });
                            }
                        }
                      });
                })
            }

        //show new product form
        
            const btnShowNewProductForm = document.getElementById("btn-admin-product-section-show");
            const formNewProduct = document.getElementById("admin-product-section-form");

            btnShowNewProductForm.addEventListener("click", () => {
                formNewProduct.classList.toggle("d-none");
            });

        // Image upload handling
            let imageInput = document.createElement('input');

            imageInput.type = 'file';
            imageInput.accept = 'image/*';
            imageInput.multiple = true;

            imageInput.addEventListener('change', (event) => {

                let files = event.target.files;
                let imageUrls = [];

                //push all the images paths into array
                for (let file of files) {
                    //use the file name plus current saving images directory as the path
                    let imagePath = `assets/resources/img/examples/products/${file.name}`;
                    imageUrls.push(imagePath);
                }

                //convert array to JSON and replace double quotes with single quotes
                let imageUrlsJson = JSON.stringify(imageUrls).replace(/"/g, "'");

                //update hidden input with new image URLs
                document.getElementById("newProductImageUrl").value = imageUrlsJson;

                //update displayed image with the first selected image
                if (files.length > 0) {
                    let newProductPreviewImage = document.getElementById('newProductImg');
                    let firstImagePath = URL.createObjectURL(files[0]);
                    newProductPreviewImage.src = firstImagePath;
                }
            });

            //trigger input event on click
            document.querySelector('.container-empty-img').addEventListener('click', (event) => {
                imageInput.click();
            });
    

        //send POST request for new product

            formNewProduct.addEventListener("submit", async(event) => {

                event.preventDefault();

                if (Object.values(validationStatus).every(status => status)) {

                    //collect form's data
                    const formData = new FormData(formNewProduct);
                    const productData = {};

                    //convert FormData entries to an object
                    formData.forEach((value, key) => {
                        productData[key] = value;
                    });

                    const createNewProductPath = "http://localhost:8080/productos/agregar";
                    
                    try {

                        let response = await postFetch(createNewProductPath, productData);

                        console.log(response);

                        //check if response is valid
                        if (response.name === productData.name) {

                            displayProductsList();

                            //Toast notification for success
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "bottom-end",
                                showConfirmButton: false,
                                timer: 3800,
                                timerProgressBar: false,
                                didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "success",
                                title: `¡Producto registrado con exito!`
                            });
                        } else {

                            //Toast notification for failure
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "bottom-end",
                                showConfirmButton: false,
                                timer: 3800,
                                timerProgressBar: false,
                                didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "error",
                                title: `¡No se pudo registrar el producto!`
                            });
                        }
                    } catch (error) {
                        //Toast notification for failure
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "bottom-end",
                            showConfirmButton: false,
                            timer: 3800,
                            timerProgressBar: false,
                            didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "error",
                            title: `¡No se pudo registrar el producto!`
                        });
                    }
                    
                }

            });

    }

    displayProductsList();
}