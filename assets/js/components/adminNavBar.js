import { updateContent } from "../routing/routing.js";
import { redirectToPage } from "../utils/redirectToPage.js";
import { freeSessionData, setUserDataFromSessionData } from "../utils/sessionStorage.js";
import { userData } from "../models/user.js";
import { updateAccountData } from "../utils/localStorage.js";


//admin navBar
const defaultNavBar = `
<nav class="nav">

    <a href="#dashboard" title="¡Tus prendas favoritas a un click de distancia!">
        <img class="logo" id="logo" src="assets/resources/img/Logo_Oshare.jpg" alt="Oshare Designs Logo">
    </a>

    <ul class="nav-menu" id="nav-menu">
        <li>
            <a href="#dashboard" title="Oshare Designs Store"> Dashboard </a>
        </li>
        <!-- <li>
                <a href="#tienda" title="¡Compra tus prendas favoritas!"> Shop </a>
            </li> -->
        <li>
            <a href="#dashboard/productos" title="¡Mira nuestros productos!"> Productos </a>
        </li>
        <li>
            <a href="#dashboard/billboard" title="¡Visitanos!"> Billboard </a>
        </li>
        <li>
            <a href="#dashboard/blog" title="¡Visitanos!"> Blog </a>
        </li>
    </ul>

    <ul class="nav-icons">
        <li>        
            <i class='bx bx-search nav-icon' id="search-icon" alt="Search" title="¡Busca la prenda que deseas!"></i>
        </li>
        <li>
            <a href="#profile" title="Mira los datos de tu perfil"> 
                <i class='bx bxs-user-detail nav-icon' id="profile-icon" alt="Profile options"></i>
            </a>
        </li>
        <li>
            <i class='bx bx-log-in nav-icon' id="log-out-icon" alt="Logout" title="Cerrar sesión"></i>
        </li>
        <li>
            <i class='bx bx-menu nav-icon' id="menu-icon" alt="Side menu"></i>
        </li>
    </ul>
</nav>
`

//header tag
const header = document.getElementById('navContainer');

export const adminNavBar = (userRole = 0) => {

    //check if user is connected

        if (userRole != 999) {

            //if user is not allowed to access redirect to main page and deny further code
            redirectToPage("", 1);
            return null;
        } else {

            //change content of navBar
            header.innerHTML = defaultNavBar;

            //nav icons
            const btnProfile = document.getElementById("profile-icon");
            const btnLogOut = document.getElementById("log-out-icon");

            //set user object's data with session data
            setUserDataFromSessionData(userData);

            //event listener for log out icon
            btnLogOut.addEventListener("click", () => {

                //update account's data before logging out
                updateAccountData(userData);

                //change session state
                userData.isSessionSet = false;

                //delete user object data
                userData.name = "";
                userData.surname = "";
                userData.email = "";
                userData.profileImage = "";
                userData.cart = [];
                userData.phone = "";
                userData.city = "";
                userData.region = "";
                userData.country = "";

                //delete session data
                freeSessionData("x_change_session");

                //get the current hash without the leading '#'
                const hash = window.location.hash.slice(1);

                //split the hash by '/'
                const segments = hash.split('/');

                //check if any segment contains 'profile'
                const containsProfile = segments.includes("profile");

                //redirect to current page if current page is not profile related
                containsProfile ?
                redirectToPage("", 0)
                :
                redirectToPage((window.location.hash).slice(1), 0)
                
                //update content based on change of session state (wait 100ms to assure redirect happens first)
                setTimeout(() => {updateContent()}, 100);
            });
        }

    //scroll behavior

        //elements
        const navBar = document.querySelector("nav");
        const logo = document.getElementById("logo");

        //toggle on or off compact design for navbar when scrolling
        window.addEventListener("scroll", () => {
            navBar.classList.toggle("compact-view", window.scrollY > 0);
            logo.classList.toggle("compact-view", window.scrollY > 0);
        });

    //hamburguer menu

        //elements
        const menuIcon = document.getElementById("menu-icon");
        const menu = document.getElementById("nav-menu");

        let menuOpen = false;

        menuIcon.addEventListener("click", () => {

            menu.classList.toggle("menu-open");

            if (!menuOpen) {
                menuIcon.classList.remove("bx-menu");
                menuIcon.classList.add("bx-x");
                menuOpen = true;
            } else {
                menuIcon.classList.remove("bx-x");
                menuIcon.classList.add("bx-menu");
                menuOpen = false;
            };
        });

}

