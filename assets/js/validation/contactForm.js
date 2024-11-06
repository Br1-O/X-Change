export const validationContactForm = (maxLengthValidation, minLengthValidation, phoneNumberValidation, emailValidation ) => {

    //contact form
      const formContact = document.querySelector('#contact-section-form');
    //contact input fields
      const emailField = document.querySelector('#contact-section-form .col .row [name="email"]');
      const phoneField = document.querySelector('#contact-section-form .col .row [name="phoneNumber"]');
      const subjectField = document.querySelector('#contact-section-form .col .row [name="subject"]');
      const commentField = document.querySelector('#contact-section-form .col .row [name="comment"]');
    //contact error messages
      const emailErrorMessage = document.getElementById('errorEmailContactForm');
      const phoneErrorMessage = document.getElementById('errorPhoneContactForm');
      const subjectErrorMessage = document.getElementById('errorSubjectContactForm');
      const commentErrorMessage = document.getElementById('errorMessageContactForm');
  
    //all error fields
      const errorMessages = document.getElementsByClassName('error');
  
    //validation for login fields
    formContact.addEventListener("submit", (event) => {
  
        try {
             
            //prevent submit of form
            event.preventDefault();
    
            //empty all previous error messages
            for (const error of errorMessages) {
            error.classList.add("d-none");
            error.innerText = "";
            }
    
            //check validations for fields
            let isEmailValid = emailValidation(emailField, emailErrorMessage);
            let isPhoneValid = false;
            let isSubjectValid = false;
            let isCommentValid = false;
    
            if (isEmailValid) {
                isPhoneValid = phoneNumberValidation(phoneField, phoneErrorMessage, false);
            }

            if (isEmailValid && isPhoneValid) {
                isSubjectValid = minLengthValidation(subjectField, subjectErrorMessage, 5, "*el asunto es muy corto");
            
                if (isSubjectValid) {
                    isSubjectValid = maxLengthValidation(subjectField, subjectErrorMessage, 20, "*20 caracteres máximo");
                }
            }

            if (isEmailValid && isPhoneValid && isSubjectValid) {
                isCommentValid = maxLengthValidation(commentField, commentErrorMessage, 500, "*500 caracteres máximo");
            
                if (isCommentValid) {
                    isCommentValid = minLengthValidation(commentField, commentErrorMessage, 5, "*el mensaje es muy corto");
                }
            }
    
            //submit contact form if all fields are valid
            if(isEmailValid && isPhoneValid && isSubjectValid && isCommentValid){
    
                //input data
                let data = {
                    email : emailField.value,
                    phone : phoneField.value,
                    subject : subjectField.value,
                    comment : commentField.value
                }
        
                //submit contact form
                let submitForm = () => {

                    //dummy function for submit
                    console.log(data);

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
                        title: `¡Formulario enviado con exito! <br> Nuestros representantes lo contactaran a la brevedad.`
                    });

                    //reset form fields values
                    formContact.reset();

                    //set focus on first field
                    emailField.focus()
                }
    
                submitForm();
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
                title: `¡No se pudo enviar el formulario en este momento! :( <br><br> Por favor, intente otra de nuestras vías de comunicación.`
            });
        }

    });
}