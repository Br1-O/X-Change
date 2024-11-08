//utils import
import { fetchData, fetchInternalData } from "../utils/fetch.js";
import { deleteFetch, postFetch } from "../utils/fetchFunctions.js";

import { carouselFunctionality } from "../utils/carousel.js";
import { redirectToPage } from "../utils/redirectToPage.js";
//navBar content
import { navBar } from "../components/navBar.js";
//home page content
import { homeContent } from "../pages/home/MAIN.js";
import { displayProductList } from "../pages/home/products.js";
import { displayBillboard } from "../pages/home/billboard.js";
import { displayReviews } from "../pages/home/reviews.js";
import { displayBlogArticles } from "../pages/home/blog.js";
//shop page content
import { shopContent } from "../pages/shop/MAIN.js";
//contact page content
import { contactPageContent } from "../pages/contact/MAIN.js";
import { validationContactForm } from "../validation/contactForm.js";
import { maxLengthValidation, minLengthValidation, phoneNumberValidation, emailValidation, isAlpha, isNum, areValuesEqual, passwordValidation } from "../validation/utils.js";

//page not found content
import { notFoundMessage } from "../pages/notFound404.js";
//page not authorized content
import { notAuthorizedMessage } from "../pages/notAuthorized401.js";

//carousel EXPERIMENTAL
import { carousel } from "../pages/carousel-experimental.js";
import { userData } from "../models/user.js";
import { footer } from "../components/footer.js";
import { getSessionData, modifySessionCart, setSessionData, setUserDataFromSessionData } from "../utils/sessionStorage.js";
import { setModalCart } from "../modals/cart.js";
import { updateAccountData } from "../utils/localStorage.js";
import { findProductByCategoryAndName, isInStock } from "../utils/products.js";
import { productRouteHandler } from "../pages/product/utils.js";
import { dinamicRouteDisplay } from "./dinamicRouting.js";
import { displaySingleProductPage } from "../pages/product/MAIN.js";
import { profilePageContent } from "../pages/profile/MAIN.js";
import { editableField, editableFieldsEventListeners } from "../components/editableField.js";
import { dashboardPageContent } from "../pages/admin/MAIN.js";
import { adminNavBar } from "../components/adminNavBar.js";
import { adminProductsPageContent } from "../pages/admin/products.js";
import { formInput, setOnChangeValidationForInput, validationStatus } from "../components/formInput.js";

//I'm not implementing this until finishing the project, since local server is unable to redirect all petitions to my index.html without using backend server utilities

// Define your routes and corresponding templates
// const routes = {
//     "/": "<h2>Home</h2><p>Welcome to our website!</p>",
//     "/#trending-now": "<h2>Trending Products</h2><p>This is the trending products section.</p>",
//     "/#contacto": "<h2>Contact Us</h2><p>Feel free to reach out to us!</p>"
//   };
  
  // Function to update content based on current URL
//   const updateContent = () => {
//     const path = window.location.pathname;
//     const content = routes[path] || "<h2>¡ Pagina no encontrada!</h2><p>La página que buscas no existe :(</p>";
//     document.getElementById("page-container").innerHTML = content;
//   }

//provitional hash based routing system until finishing project, then we switch to the routing based on raw URL paths

//Update content based on hash
export const updateContent = async() => {
    //get the url
    const hash = window.location.hash.substring(1); // Remove leading "#"

    //get the section ID from the hash
    const sectionId = window.location.hash.substring(1); // Remove the leading '#'

    //container for page content
    const content = document.getElementById("main");
    //section with the corresponding ID
    const section = document.getElementById(sectionId);

    //fetch product data
    let productsList = await fetchInternalData("assets/js/json/products-list.json", "products");

    //■■■■■■■■■■■■■■■■■■■■ Shopping cart updating ■■■■■■■■■■■■■■■■■■■■//

    //update shopping cart's content
    setModalCart(userData, productsList, isInStock);

    // Listen for itemAddedToCart event to update the cart
    window.addEventListener('itemAddedToCart', () => {                
        
        //update session storage cart to user object's cart
        modifySessionCart(userData);

        //update shopping cart's content
        setModalCart(userData, productsList, isInStock);
        
        //update account's data
        updateAccountData(userData);
    });

    // Listen for itemDeletedFromCart event to update the cart
    window.addEventListener('itemDeletedFromCart', () => {

        //update session's shopping cart value
        modifySessionCart(userData);
        
        //update account's data
        updateAccountData(userData);

        //update shopping cart's content
        setModalCart(userData, productsList, isInStock);

    });

    //■■■■■■■■■■■■■■■■■■■■ hash system routing ■■■■■■■■■■■■■■■■■■■■//

    if (section) {
        //scroll to the section with that id if it exist
        section.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section

    }else{
        // Change page content based on hash
        switch(hash) {

            //home page
            case '':

                //update title attribute of page
                document.title =  `X-Change · Intercambios virtuales`;

                //include proper navbar
                navBar(userData.isSessionSet);

                //update home content
                content.innerHTML = homeContent;
                
                //products container
                const containerTrendingProducts = document.getElementById("container-trending-products");
                //billboard container
                const containerBillboard = document.getElementById("billboard-ad-container");
                //reviews container
                const containerReviews = document.getElementById("reviews-container");
                //blog articles container
                const containerBlogArticles = document.getElementById("blog-container-articles");
                
                //fetch to home data
                const homeFetchUtils = async () => {
                    let products= await fetchInternalData("assets/js/json/products-list.json", "products"); 
                    let billboardAds= await fetchInternalData("assets/js/json/billboard.json", "billboard");            
                    let reviews= await fetchInternalData("assets/js/json/reviews.json", "reviews");            
                    let blogArticles= await fetchInternalData("assets/js/json/blog.json", "articles");            

                    displayProductList(products, containerTrendingProducts);
                    displayBillboard(billboardAds, containerBillboard);
                    displayReviews(reviews, containerReviews);
                    displayBlogArticles(blogArticles, containerBlogArticles);
                }

                //apply fetch to home data
                homeFetchUtils();

                //include footer
                footer();

            break;
            
            //store page
            case 'tienda':

                //update title attribute of page
                document.title =  `X-Change · Tienda`;

                //include proper navbar
                navBar(userData.isSessionSet);

                //update page content
                content.innerHTML = shopContent;

                //products container
                const shopContainerTrendingProducts = document.getElementById("container-trending-products");

                //fetch to shop data
                const shopFetchUtils = async () => {
                    let products= await fetchInternalData("assets/js/json/products-list.json", "products"); 

                    displayProductList(products, shopContainerTrendingProducts);
                }

                //apply fetch to shop data
                shopFetchUtils();

                //include footer
                footer();
                
            break;
            
            //contact page
            case 'contacto':

                //update title attribute of page
                document.title =  `X-Change · Contacto`;

                //include proper navbar
                navBar(userData.isSessionSet);

                //update page content
                content.innerHTML = contactPageContent;

                //include validation for contact form
                validationContactForm(maxLengthValidation, minLengthValidation, phoneNumberValidation, emailValidation);

                //don't include footer
                footer(false);

            break;
            
            //products page
            case 'productos':

                //update title attribute of page
                document.title =  `X-Change  · Tienda`;

                //include proper navbar
                navBar(userData.isSessionSet);

                content.innerHTML = carousel;

                //include footer
                footer();
            break;
            
            //profile page
            case 'profile':

                //include proper navbar
                navBar(userData.isSessionSet);
                
                //check if user is connected
                if (userData.isSessionSet) {

                    //check if name attribute is not empty
                    (userData.name && userData.surname) ?
                    //update title attribute of page w/ user's name
                    document.title =  `${userData.name} ${userData.surname} · X-Change ` 
                    :
                    //update w/ generic title attribute of page
                    document.title =  `Tu perfil · X-Change `;

                    //update page content w/ dependencies injection
                    profilePageContent(userData, editableField, editableFieldsEventListeners, 
                    minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation
                    );
                    
                    //event on profile edit
                    window.addEventListener('profileEdited', (event) => { 

                        //check if the value in the input field is valid
                        if(event.detail.value){ 

                            //set the event data variables
                            const { name, value } = event.detail;

                            //set userdata field to the data in the event variable
                            userData[name]= value;

                            //update the sessionData base on the userData's variable data
                            setSessionData("x_change_session", JSON.stringify(userData));
                            //update the localStorage information base on the userData's variable data
                            updateAccountData(userData);

                            //update page content
                            profilePageContent(userData, editableField, editableFieldsEventListeners, 
                            minLengthValidation, maxLengthValidation, isAlpha, phoneNumberValidation, emailValidation);
                        }
                    });
                } else {

                    //update title attribute of page
                    document.title =  `X-Change  · Not authorized 401`;
                    //display not authorized default page
                    content.innerHTML = notAuthorizedMessage;
                    //if user is not connected redirect to main page
                    redirectToPage("", 3000);
                    //open account modal so the user can connect
                    const accIcon = document.getElementById('account-icon');
                    setTimeout(() => {accIcon.click()}, 3000);
                } 

                //include footer
                footer();
            break;

            //administration dashboard
            case 'dashboard':

                adminNavBar(999);

                //update title attribute of page
                document.title =  `X-Change · ADMIN Dashboard`;

                dashboardPageContent(content, 999, userData, redirectToPage);

                //don't include footer
                footer(false);

            break;

            case 'dashboard/productos':

                adminNavBar(999);

                //update title attribute of page
                document.title =  `Oshare Designs · ADMIN Productos`;

                adminProductsPageContent(content, 999, fetchData, postFetch, deleteFetch, 
                    redirectToPage, formInput, validationStatus, setOnChangeValidationForInput,
                    minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, areValuesEqual, passwordValidation
                );

                //don't include footer
                footer(false);

            break;

            //dinamic routes and not found page
            default:

                //■■■■■■■■■■■■■■■■■■■■ Product page dinamic URL rendering ■■■■■■■■■■■■■■■■■■■■//

                // Dynamic URL matching with regular expression
                const tiendaProductoPattern = /^tienda\/producto\/([^\/]+)\/([^\/]+)$/;
                //URL has to be in the form: tienda/producto/category/name-of-product

                // Check if pattern for dinamic route of product's page is match (w/ injected dependencies into productRouteHandler)
                const singleProductPageRouteHandler = await dinamicRouteDisplay(hash, tiendaProductoPattern, async (routeParams) => {
                    await productRouteHandler(
                        routeParams,
                        findProductByCategoryAndName,
                        userData,
                        redirectToPage,
                        setUserDataFromSessionData,
                        notFoundMessage,
                        displaySingleProductPage
                    );
                });

                //■■■■■■■■■■■■■■■■■■■■ if dinamic routes are not matched display not found page ■■■■■■■■■■■■■■■■■■■■//

                if (singleProductPageRouteHandler) {

                }else{
                    //update title attribute of page
                    document.title =  `Oshare Designs · Not Found 404`;

                    //display not found default page
                    content.innerHTML = notFoundMessage;
                    redirectToPage("", 3000);
                }

                //include proper navbar
                navBar(userData.isSessionSet);
                //include footer
                footer();
                
            break;
        }

        // Scroll to the top of the page once content is changed
        window.scrollTo({ top: 0});

        //carousel functionality
        const buttons = document.querySelectorAll("[data-carousel-button]");
        if (buttons) {
            carouselFunctionality(buttons);
        }
        //init Animation on Scroll library
        AOS.init();
    }
}

//handle popstate event (back/forward navigation)
window.addEventListener("popstate", updateContent);

//update content when the page loads or hash changes
window.addEventListener('hashchange', updateContent);

//update content when the page loads or hash changes
document.addEventListener("DOMContentLoaded", () => {

    //update title attribute of loading page
    document.title =  ` X - Change · Loading...`;

    const loadingScreen = document.getElementById("loading-overlay");
    const body = document.querySelector("body");

    //display loading screen on DOM loading start
    loadingScreen.classList.add("flex");
    body.style.overflowY = "hidden";

    window.onload = () => {

        //display content when the window if fully loaded
        loadingScreen.classList.remove("flex");
        loadingScreen.classList.add("d-none");
        body.style.overflowY = "scroll";


        //recover session data if user was connected
        if(getSessionData("x_change_session")){
            //set user object's data with session's data  
            setUserDataFromSessionData(userData);
        }

        //update content based on the URL
        updateContent();
    }
});