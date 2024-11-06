export const contactPageContent = `

    <div class="col w-100" id="contact-section-container">

        <div style="width:100%; background-color:var(--main-bg-color);">

            <!-- Wavy separator -->
            <svg width="100%" height="100%" style="margin: -5px 0px;" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
            <!-- Modify last value of viewBox to modify its margin on the Y axis -->
            <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
            stroke="var(--main-bg-color)" stroke-width="0px" stroke-opacity="0.5" fill="var(--border-color)" fill-opacity="1" 
            class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
            </svg> 

            <div class="rowToCol">

                <div id="contact-info" class="col">

                    <img id="footer-logo" src="assets/resources/img/Logo_Exchange.png" alt="X-Change logo">

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

                </div>

                <div id="map" class="col">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6288.03656744649!2d-57.559715!3d-38.000034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dc1cfac230c9%3A0xf36c95bb4204c0fc!2sCentro%20De%20Formaci%C3%B3n%20Profesional%20N%C2%BA415%20Sergio%20Osvaldo%20Cirese!5e0!3m2!1sen!2sar!4v1716514796486!5m2!1sen!2sar" 
                        id="google-map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>

            </div>

        </div>

        <!-- Wavy separator -->
        <svg style="background-color: var(--border-color); margin: -5px 0px;" width="100%" height="100%" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
            <!-- Modify last value of viewBox to modify its margin on the Y axis -->
            <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
            stroke="var(--border-color)" stroke-width="0px" stroke-opacity="0.5" fill="var(--main-bg-color)" fill-opacity="1" 
            class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
        </svg> 

        <div class="col" data-aos="zoom-in"  data-aos-offset="100" data-aos-duration="2000">

            <h4 class="subtitle" id="subtitleFormContact"> ¡No dudes en contactarnos!  </h4>

            <form id="contact-section-form" action="" method="post" class="container-form">

                <div class="col w-100">

                    <p id="errorEmailContactForm" class="error d-none"></p>
                    <div class="row w-100">
                        <label for="email"> Correo electronico </label>
                        <input type="text" name="email" class="form-text-input" placeholder="Ingrese su correo electronico">
                    </div>
            
                    <p id="errorPhoneContactForm" class="error d-none"></p>
                    <div class="row w-100">
                        <label for="phoneNumber"> Teléfono </label>
                        <input type="text" name="phoneNumber" class="form-text-input" placeholder="Ingrese su número de telefono (OPCIONAL)">
                    </div>

                    <p id="errorSubjectContactForm" class="error d-none"></p>
                    <div class="row w-100">
                        <label for="subject"> Asunto </label>
                        <input type="text" name="subject" class="form-text-input" placeholder="Ingrese el motivo de su consulta">
                    </div>

                    <p id="errorMessageContactForm" class="error d-none"></p>
                    <div class="row w-100">
                        <label for="comment"> Consulta </label>
                        <textarea name="comment" id="form-contact-comment" placeholder="Ingrese su consulta"></textarea>
                    </div>

                </div>

                <input type="submit" class="form-btn" id="btn-contact-section" value="Enviar consulta">

            </form>

        </div>
        
    </div>

    <!-- Wavy separator -->
    <svg width="100%" height="100%" style="margin: -5px 0px;" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
    <!-- Modify last value of viewBox to modify its margin on the Y axis -->
    <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
    stroke="var(--main-bg-color)" stroke-width="0px" stroke-opacity="0.5" fill="var(--border-color)" fill-opacity="1" 
    class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
    </svg> 
`