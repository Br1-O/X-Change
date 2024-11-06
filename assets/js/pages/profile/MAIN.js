export const profilePageContent = (userData = {}, editableField, editableFieldsEventListeners,
    minLengthValidation, maxLengthValidation, isAlpha, phoneNumberValidation, emailValidation) => {

    //container for page content
    const content = document.getElementById("main");
    
    //template for profile page
    let template = `
    
        <!-- Wavy separator -->
        <svg style="margin: -5px 0px;" width="100%" height="100%" id="svg" viewBox="0 180 1440 150" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
            <!-- Modify last value of viewBox to modify its margin on the Y axis -->
            <path d="M 0,390 L 0,150 C 84.74132600480931,175.79732050841636 169.48265200961862,201.5946410168327 232,188 C 294.5173479903814,174.4053589831673 334.81071796633466,121.41875644108555 401,95 C 467.18928203366534,68.58124355891445 559.2744761250428,68.73033321882514 641,93 C 722.7255238749572,117.26966678117486 794.0913775334938,165.6599106836139 861,164 C 927.9086224665062,162.3400893163861 990.3600137409824,110.63002404671936 1055,105 C 1119.6399862590176,99.36997595328064 1186.4685675025764,139.81999312950876 1251,155 C 1315.5314324974236,170.18000687049124 1377.7657162487117,160.09000343524562 1440,150 L 1440,390 Z" 
            stroke="#9b58da" stroke-width="0px" stroke-opacity="0.5" fill="rgb(67, 75, 82)" fill-opacity="1" 
            class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path>
        </svg> 

        <div class="col w-100" id="profile-section-container">

            <h4 class="subtitle"> Actualiza tus datos:  </h4>

            <div class="container-form col" data-aos="zoom-in" data-aos-offset="100" data-aos-duration="2000">

                <form class="rowToCol" id="profile-section-form" action="" method="post">

                    <div class="col w-100">

                        <p id="errorPictureProfilePage" class="error d-none" style="margin:auto;"></p>
                        <div class="container-empty-img">
                            <img src="${userData.profileImage ? userData.profileImage : "./assets/resources/img/blank-profile-picture.png"}" alt="profile picture">
                            <span class="message-over-image"> ${userData.profileImage ? "Cambia tu foto de perfil" : "Sube una foto de perfil"} </span>
                        </div>
                    </div>

                    <div class="col w-100">

                        ${editableField(userData.name,"errorNameProfileForm", "name", "Nombre", "Dinos tu nombre")}
                        ${editableField(userData.surname,"errorSurnameProfileForm", "surname", "Apellido", "Dinos tu apellido")}
                        ${editableField(userData.email,"errorEmailProfileForm", "email", "Correo", "Ingresa tu correo electronico")}
                        ${editableField(userData.phone,"errorPhoneProfileForm", "phone", "Teléfono", "Ingresa tu número de teléfono")}
                        ${editableField(userData.city,"errorCityProfileForm", "city", "Ciudad", "Ingresa tu ciudad")}
                        ${editableField(userData.region,"errorRegionProfileForm", "region", "Provincia", "Ingresa tu provincia")}
                        ${editableField(userData.country,"errorCountryProfileForm", "country", "País", "Ingresa tu país")}

                    </div>
                </form>
            </div>
        </div>
    `

    //set the content of the profile page
    content.innerHTML = template;

    //set event listeners

        //event listener for edit, confirm and cancel btns
        const btnsEdit = document.querySelectorAll('#profile-section-form .col .rowToCol div .bx-edit-alt');
        const btnsConfirm = document.querySelectorAll('#profile-section-form .col .rowToCol div .bxs-check-circle');
        const btnsCancel = document.querySelectorAll('#profile-section-form .col .rowToCol div .bxs-x-circle');
        
        editableFieldsEventListeners(btnsEdit, btnsConfirm, btnsCancel,
        minLengthValidation, maxLengthValidation, isAlpha, phoneNumberValidation, emailValidation);

        //event listener to open submit of profile picture
        const containerImg = document.querySelector('.container-empty-img');

        containerImg.addEventListener("click", async() => {

            const profileImg = document.querySelector('.container-empty-img img');
            const errorField = document.getElementById('errorPictureProfilePage');

            try {

                //use file API to handle select of picture file
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{
                        description: 'Images',
                        accept: {'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg']},
                    }],
                    multiple: false
                });

                //picture file selected
                const file = await fileHandle.getFile();

                //check if the selected file matches the allowed types
                if (file.type === 'image/png' || file.type === 'image/jpeg') {

                    //create a file reader instance
                    const reader = new FileReader();

                    //when a file is selected change the src of the profile picture
                    reader.onload = function(e) {

                        profileImg.src = e.target.result;
                        errorField.classList.add('d-none');

                        //pass the field's data with the event
                        const eventData = {
                            name: "profileImage",
                            value: reader.result
                        };

                        //dispatch edit event with field data
                        window.dispatchEvent(new CustomEvent('profileEdited', { detail: eventData }));
                    };

                    //trigger reader's load event
                    reader.readAsDataURL(file);
                }else{
                    //display error message
                    errorField.innerText = "¡El tipo del archivo seleccionado no es válido! (sólo PNG o JPEG)";
                    errorField.classList.remove('d-none');
                }
            } catch (error) {

                console.error('¡La selección del archivo falló!', error);
            }
        }); 
}




