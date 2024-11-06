export const formInput = (inputFieldId, errorFieldId, nameForField, labelForField, 
    placeholder = "Ingresa tus datos", typeOfField = "text", fieldData = "") => {

    let inputTemplate = "";

    if (typeOfField === "password") {

        inputTemplate = `
            <p id="${errorFieldId}" class="error d-none"></p>
            <div class="row w-100" style="position:relative;">
                <label for=${nameForField}> ${labelForField} </label>
                <input type="${typeOfField}" id="${inputFieldId}" class="form-field" name=${nameForField} class="form-text-input" placeholder="${placeholder}" aria-label="campo de formulario para ${labelForField}" value="${fieldData ? fieldData : ""}">
                <i class='bx bx-low-vision display-password' aria-label="show hide password eye icon"></i>
            </div>
        `
    } else {

        inputTemplate = `
            <p id="${errorFieldId}" class="error d-none"></p>
            <div class="row w-100">
                <label for=${nameForField}> ${labelForField} </label>
                <input type="${typeOfField}" id="${inputFieldId}" class="form-field" name=${nameForField} class="form-text-input" placeholder="${placeholder}" aria-label="campo de formulario para ${labelForField}" value="${fieldData ? fieldData : ""}">
            </div>
        `
    }

    return inputTemplate;
}

export const setEventListenerForShowHidePasswordIcon = (btn) => {
    btn.addEventListener("click", (e) => {

        e.preventDefault();
  
        //toggle type of input to show/hide password
        if (btn.classList.contains("bx-low-vision")) {
          //change icon
          btn.classList.add("bx-show-alt");
          btn.classList.remove("bx-low-vision");
          //change type of input
          btn.previousElementSibling.type= "text";
          btn.previousElementSibling.focus();
        } else {
          //change icon
          btn.classList.remove("bx-show-alt");
          btn.classList.add("bx-low-vision");
          //change type of input
          btn.previousElementSibling.type= "password";
          btn.previousElementSibling.focus();
        }
      });
}

export const validationStatus = {
    newProductName: false,
    newProductPrice: false,
    newProductDiscount: false,
    newProductMaterial: false,
    newProductFromCountry: false,
    newProductDescription: false
};

export const setOnChangeValidationForInput = (inputFieldId, errorFieldId,
    minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation, passwordValidation, areValuesEqual, fieldToCompareTo = null) => {

    let inputField = document.getElementById(inputFieldId);
    let errorField = document.getElementById(errorFieldId);

    let inputName = inputField.name;
    let inputType = inputField.type;

    const validate = () => {

        let isValid = false;

        switch (inputType) {
            case "text":
                switch (inputName) {
                    case "name":
                    case "surname":
                    case "city":
                    case "region":
                    case "country":
                    case "from_country":
                    case "material": 
                    {                
                        let validMinLength = minLengthValidation(inputField, errorField, 3, "El campo debe tener al menos 3 caracteres");
                        let validMaxLength = maxLengthValidation(inputField, errorField, 20, "El campo no puede exceder los 20 caracteres");
                        let validChar = isAlpha(inputField, errorField);

                        isValid = validMinLength && validMaxLength && validChar;
                        break;
                    }

                    case "description":
                    {                
                        let validMinLength = minLengthValidation(inputField, errorField, 3, "El campo debe tener al menos 3 caracteres");
                        let validMaxLength = maxLengthValidation(inputField, errorField, 100, "El campo no puede exceder los 100 caracteres");
                        let validChar = isAlpha(inputField, errorField);

                        isValid = validMinLength && validMaxLength && validChar;
                        break;
                    }

                    case "phone":
                        isValid = phoneNumberValidation(inputField, errorField);
                        break;

                    case "price":
                    case "discount":
                    {
                        let validMinLength = minLengthValidation(inputField, errorField, 1, "El campo debe tener al menos 1 caracter");
                        let validMaxLength = maxLengthValidation(inputField, errorField, 20, "El campo no puede exceder los 20 caracteres");
                        let validNum = isNum(inputField, errorField);

                        isValid = validMinLength && validMaxLength && validNum;
                        break;
                    }   

                    default:
                    {
                        let validMinLength = minLengthValidation(inputField, errorField, 3, "El campo debe tener al menos 3 caracteres");
                        let validMaxLength = maxLengthValidation(inputField, errorField, 20, "El campo no puede exceder los 20 caracteres");

                        isValid = validMinLength && validMaxLength;
                        break;
                    }
                }
                break;

            case "email":
                if (inputName === "emailConfirm" && fieldToCompareTo) {
                    isValid = areValuesEqual(inputField, fieldToCompareTo, errorField, "¡Los correos deben coincidir!");
                } else {
                    isValid = emailValidation(inputField, errorField);
                }
                break;

            case "password":
                isValid = passwordValidation(inputField, errorField);
                break;

            default:
                isValid = false;
                break;
        }

        validationStatus[inputFieldId] = isValid;
        if (isValid) {
            errorField.innerText = "";
            errorField.classList.add("d-none");
        }
    };

    // Set event listener for future changes
    inputField.addEventListener("change", validate);
};
