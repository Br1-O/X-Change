import { accountTemplate, accountModal } from "../modals/account.js";
import { setSessionData, setUserDataFromSessionData } from "../utils/sessionStorage.js";
import { redirectToPage } from "../utils/redirectToPage.js";
import { userData } from "../models/user.js";
import { updateContent } from "../routing/routing.js";
import { closeModal } from "../modals/utils.js";
import { areValuesEqual, emailValidation, passwordValidation } from "./utils.js";
import { getLocalData, searchInLocalStorage, setLocalData } from "../utils/localStorage.js";

export const validationLoginRegister = () => {

  //login form
    const formLogin = document.querySelector('#modalLogin form');
    const btnLogin = document.getElementById('btnLogin');
  //login input fields
    const emailLogin = document.querySelector('#modalLogin [name="email"]');
    const passwordLogin = document.querySelector('#modalLogin [name="password"]');
  //login error messages
    const emailLoginErrorMessage = document.getElementById('errorEmailLogin');
    const passwordLoginErrorMessage = document.getElementById('errorPasswordLogin');

  //register form
    const formRegister = document.querySelector('#modalRegister form');
    const btnRegister = document.getElementById('btnRegister');
  //register input fields
    const emailRegister = document.querySelector('#modalRegister [name="email"]');
    const emailConfirmRegister = document.querySelector('#modalRegister [name="emailConfirm"]');
    const passwordRegister = document.querySelector('#modalRegister [name="password"]');
    const passwordConfirmRegister = document.querySelector('#modalRegister [name="passwordConfirm"]');
  //register error messages
    const EmailRegisterErrorMessage = document.getElementById('errorEmailRegister');
    const EmailConfirmRegisterErrorMessage = document.getElementById('errorEmailConfirmRegister');
    const PasswordRegisterErrorMessage = document.getElementById('errorPasswordRegister');
    const PasswordConfirmRegisterErrorMessage = document.getElementById('errorPasswordConfirmRegister');

  //recover password form
    const formRecover = document.querySelector('#modalRecoverPass form');
  //recover password input fields
    const emailRecover = document.querySelector('#modalRecoverPass [name="email"]');
  //register error messages
    const emailRecoverErrorMessage = document.getElementById('errorEmailRecoverPass');

  //all error fields
    const errorMessages = document.getElementsByClassName('error');

  //validation for login fields and implementation for login
  formLogin.addEventListener("submit", (event) => {

    try {
      
      //prevent submit of form
      event.preventDefault();

      //empty all previous error messages
      for (const error of errorMessages) {
        error.classList.add("d-none");
        error.innerText = "";
      }

      let isEmailValid = emailValidation(emailLogin, emailLoginErrorMessage);
      let isPasswordValid = false;

      if (isEmailValid) {
        isPasswordValid = passwordValidation(passwordLogin, passwordLoginErrorMessage);
      }

      //submit login petition if all fields are valid
      if(isEmailValid && isPasswordValid){

        //input data
        let email = emailLogin.value;
        let hashedPassword = CryptoJS.SHA256(passwordLogin.value).toString(CryptoJS.enc.Hex);

        //verification to dummy data (later will be switched for fetch function to backend db)
        let submitLogin = async () => {
          let validUser = false;

          //check if oshare_designs object already exists in localstorage
          let oshareLocal = searchInLocalStorage("oshare_designs");

          //if it exist
          if (oshareLocal) {

            //parse the JSON into a Js object
            oshareLocal = JSON.parse(oshareLocal);

            //iterate through users in the object
            oshareLocal.users.forEach(user => {
              //check if email exists
              if (user.email == email) {

                validUser = true;

                //check if passwords match
                if (user.key === hashedPassword) {
    
                  //set session object
                  let sessionData = {
                    "name" : user.name,
                    "surname" : user.surname,
                    "email" : user.email,
                    "profileImage" : user.profileImage,
                    "cart" : user.cart,
                    "phone" : user.phone,
                    "city" : user.city,
                    "region" : user.region,
                    "country" : user.country,
                    "isSessionSet" : true
                  }
    
                  //set session data
                  setSessionData("oshare_designs_session", JSON.stringify(sessionData));

                  //set user object
                  setUserDataFromSessionData(userData);
    
                  //reset form fields values
                  formRegister.reset();
                  formLogin.reset();
                  formRecover.reset();
                      
                  //close modal window
                  closeModal();
    
                  //redirect to logged page
                  redirectToPage((window.location.hash).slice(1), 0);
    
                  //update content based on change of session state
                  updateContent();
    
                } else {
                  //display error message
                  emailLoginErrorMessage.classList.remove("d-none");
                  emailLoginErrorMessage.innerText = "¡Usuario o contraseña incorrectos!";
    
                  emailLogin.focus();
                }
              }
            });
          }

          if (!validUser) {
            //display error message
            emailLoginErrorMessage.classList.remove("d-none");
            emailLoginErrorMessage.innerText = "¡Usuario o contraseña incorrectos!";

            emailLogin.focus();
          }
        }

        submitLogin();
      }

    } catch (error) {

      //Toast notification for failure
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: false,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
          icon: "error",
          title: `¡No se pudo iniciar sesión! :( <br><br> Por favor, intentelo más tarde.`
      });

    }

  });
  
  //validation for register fields and implementation for register
  formRegister.addEventListener("submit", (event) => {
        
    try {
      
      //prevent submit of form
      event.preventDefault();

      //empty all previous error messages
      for (const error of errorMessages) {
        error.classList.add("d-none");
        error.innerText = "";
      }

      let isEmailValid = emailValidation(emailRegister, EmailRegisterErrorMessage);
      let areEmailsEqual = false;
      let isPasswordValid = false;
      let arePasswordsEqual = false;

      if (isEmailValid) {
        areEmailsEqual = areValuesEqual(emailRegister, emailConfirmRegister, EmailConfirmRegisterErrorMessage, "*los correos deben coincidir");
      }

      if (isEmailValid && areEmailsEqual) {
        isPasswordValid = passwordValidation(passwordRegister, PasswordRegisterErrorMessage);
      }

      if (isEmailValid && areEmailsEqual && isPasswordValid) {
        arePasswordsEqual = areValuesEqual(passwordRegister, passwordConfirmRegister, PasswordConfirmRegisterErrorMessage, "*las contraseñas deben coincidir");
      }

      //submit register petition if all fields are valid
      if(isEmailValid && areEmailsEqual && isPasswordValid && arePasswordsEqual){
        //input data
        let email = emailRegister.value;
        let hashedPassword = CryptoJS.SHA256(passwordRegister.value).toString(CryptoJS.enc.Hex);

        let validUser = true;

        //verification to dummy data (later will be switched for fetch function to backend db)
        let submitRegister = async () => {

          //check if oshare_designs object is already in localstorage
          let oshareLocal = searchInLocalStorage("oshare_designs");

          //If not create empty object
          if (!oshareLocal) {

            let oshareLocalObject = 
            {
              users: [],
              preferences: []
            }

            //set empty object into localstorage
            setLocalData("oshare_designs", JSON.stringify(oshareLocalObject));

            //get empty object from localstorage
            oshareLocal = getLocalData("oshare_designs");
          }

          //parse the JSON into Js object
          oshareLocal = JSON.parse(oshareLocal);

          //iterate through users store in the object
          oshareLocal.users.forEach(user => {
            //check if email is already registered
            if (user.email == emailRegister.value) {
              validUser = false;
            }
          });

          //if register input is valid
          if (validUser) {

            //Toast notification for success
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: `¡Registro exitoso con el correo: <br> ${email} ! `
            });

            //reset form fields values
            formRegister.reset();
            formLogin.reset();
            formRecover.reset();

            //close modal window
            closeModal();

            //set user object for localStorage
            let user = {
              "name" : "",
              "surname" : "",
              "email" : email,
              "key" : hashedPassword,
              "profileImage" : "",
              "phone" : "",
              "city" : "",
              "region" : "",
              "country" : "",
              "cart" : []
            }

            //add user to oshareLocal's users
            oshareLocal.users.push(user);
            //set localStorage data
            setLocalData("oshare_designs", JSON.stringify(oshareLocal));

            //set data to user object
            userData.email = email;

            //change session state
            userData.isSessionSet = true;

            //set session object for sessionStorage
            let sessionData = {
              "name" : "",
              "surname" : "",
              "email" : email,
              "profileImage" : "",
              "cart" : [],
              "phone" : "",
              "city" : "",
              "region" : "",
              "country" : "",
              "isSessionSet" : true
            }

            //set session data
            setSessionData("oshare_designs_session", JSON.stringify(sessionData));

            //redirect to logged page
            redirectToPage((window.location.hash).slice(1), 0);

            //update content based on change of session state
            updateContent();

          }else{
            //display message
            EmailRegisterErrorMessage.classList.remove("d-none");
            EmailRegisterErrorMessage.innerText= "¡Este correo ya está registrado!";

            emailRegister.focus();
          }
        }

        submitRegister();
      }

    } catch (error) {

      //Toast notification for failure
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: false,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
          icon: "error",
          title: `¡No se pudo registrar el usuario! <br><br> Por favor, intentelo más tarde.`
      });

    }

  });

  //validation for recover password field and implementation for recover
  formRecover.addEventListener("submit", (event) => {

    try {
      
      //prevent submit of form
      event.preventDefault();

      //empty all previous error messages
      for (const error of errorMessages) {
        error.classList.add("d-none");
        error.innerText = "";
      }

      //check email
      if(emailValidation(emailRecover, emailRecoverErrorMessage)){
        //Toast notification for success
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "info",
          title: `Correo enviado a: ${emailRecover.value} <br><br> ¡Siga las instrucciones para recuperar su cuenta!`
        });

        //reset register fields value
        formRecover.reset();
        //switch to login modal
        accountModal(accountTemplate);
      }

    } catch (error) {
      //Toast notification for failure
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: false,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
          icon: "error",
          title: `¡No se pudo enviar el mensaje de recuperación! <br><br> Por favor, intentelo más tarde.`
      });
    }

  });

}