const footerContent = `      
<!-- Wavy separator -->
    <!-- Wavy separator -->
    <svg  id="trending-now" width="100%" height="100%" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
    <!-- Modify last value of viewBox to modify its margin on the Y axis -->
    <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
    stroke="var(--border-color)" stroke-width="0px" stroke-opacity="0.5" fill="rgb(188, 203, 236)" fill-opacity="1" 
    class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
    </svg> 

<!-- Footer -->
    <footer id="contact">
        <div class="footer-container">

            <img id="footer-logo" src="assets/resources/img/Logo_Exchange.png" alt="Oshare Designs logo">

            <div class="footer-container-info" id="contact-info">
                <a href="">
                    Almte. Brown 3466 
                </a>
                <a href="">
                    Mar del Plata, Provincia de Buenos Aires B7600
                </a>
                <a href="">
                    +5492235012345
                </a>
                <a href="">
                    x.change@gmail.com
                </a>

                <div class="footer-container-social-media">
                    <a href="">
                        <i class='bx bxl-facebook'></i>
                    </a>
                    <a href="">
                        <i class='bx bxl-twitter'></i>
                    </a>
                    <a href="">
                        <i class='bx bxl-instagram' ></i>
                    </a>
                    <a href="">
                        <i class='bx bxl-youtube' ></i>
                    </a>
                    <a href="">
                        <i class='bx bxl-linkedin' ></i>
                    </a>
                </div>

            </div>

            <div class="footer-container-info">

                <h4> Atención al cliente </h4>

                <a href="" class="footer-social-media">
                    Contactanos
                </a>
                <a href="" class="footer-social-media">
                    Sobre nosotros
                </a>
                <a href="" class="footer-social-media">
                    Reclamos y Devoluciones
                </a>
                <a href="" class="footer-social-media">
                    Privacidad
                </a>

            </div>

            <div class="footer-container-info" id="newsletter">

            <p> ¡Adherite a nuestro boletín semanal! </p>
            <a href="" class="footer-social-media">
                Newsletter
            </a>
            <p>¡Recibí avisos de nuestras nuevas ofertas y novedades!</p>

            </div>
        </div>

        <div class="footer-copyright">
            <p> X-Change © 2024 · All rights reserved </a></p>
        </div>

    </footer>
`

export const footer = (show = true) => {

    let footerSection = document.getElementById("footer-section");

    if (show) {
        footerSection.innerHTML = footerContent;
    }else{
        footerSection.innerHTML = "";
    }
};