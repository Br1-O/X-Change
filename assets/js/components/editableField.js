
export const editableField = (fieldData = false, errorFieldId, nameForField, labelForField, 
    placeholder = "Ingresa tus datos", noDataMessage = "Aún no ingresado") => {

    return fieldData ? 
        `<div class="editableFieldContainer">
            <p id="${errorFieldId}" class="error d-none"></p>
            <div class="rowToCol w-100">
                <label for="${nameForField}"> ${labelForField} </label>
                <div>
                    <p> ${fieldData} </p>
                    <input type="text" name=${nameForField} class="form-text-input d-none" placeholder="${placeholder}" value="${fieldData}">
                    <i class='bx bx-edit-alt'></i>
                    <i class='bx bxs-check-circle d-none'></i>
                    <i class='bx bxs-x-circle d-none'></i>
                </div>
            </div>
        </div>` 
            :
        `<div class="editableFieldContainer">
            <p id="${errorFieldId}" class="error d-none"></p>
            <div class="rowToCol w-100">
                <label for=${nameForField}> ${labelForField} </label>
                <div>
                    <p> ${noDataMessage} </p>
                    <input type="text" name="${nameForField}" class="form-text-input d-none" placeholder="${placeholder}" value="${fieldData ? fieldData : ""}">
                    <i class='bx bx-edit-alt'></i>
                    <i class='bx bxs-check-circle d-none'></i>
                    <i class='bx bxs-x-circle d-none'></i>
                </div>
            </div>
        </div>`
}

export const editableFieldsEventListeners = (btnsEdit, btnsConfirm, btnsCancel,
    minLengthValidation, maxLengthValidation, isAlpha, isNum, phoneNumberValidation, emailValidation) => {
    
    //event listener for edit btn
    for (const btn of btnsEdit) {
        btn.addEventListener("click", () => {
            //container and elements
            const container = btn.parentElement;
            const closestParagraph = container.querySelector('p');
            const closestInput = container.querySelector('input');
            const closestConfirm = container.querySelector('.bxs-check-circle');
            const closestCancel = container.querySelector('.bxs-x-circle');

            //toggle visibily of p and input elements
            closestParagraph.classList.toggle('d-none');
            closestInput.classList.toggle('d-none');
            btn.classList.toggle('d-none');
            closestConfirm.classList.toggle('d-none');
            closestCancel.classList.toggle('d-none');

            //focus on new input displayed
            closestInput.focus();

            //event on enter key for input field
            closestInput.addEventListener('keydown', (event) => {

                let errorField = container.parentElement.parentElement.querySelector('p');

                if (event.key === 'Enter') {
                    
                    event.preventDefault();
                    
                    //check validations
                    if (closestInput.value) {
                
                        switch (closestInput.name) {
                            case "name":
                            case "surname":
                            case "city":
                            case "region":
                            case "country":
            
                            let validMinLength = minLengthValidation(closestInput, errorField, 3, "El campo debe tener al menos 3 caracteres");
                            let validMaxLength = maxLengthValidation(closestInput, errorField, 20, "El campo no puede exceder los 20 caracteres");
                            let validChar = isAlpha(closestInput, errorField);

                            if (validMinLength && validMaxLength && validChar) {

                                errorField.innerText = "";
                                errorField.classList.add("d-none");
                                
                                //pass the field's data with the event
                                const editEventData = {
                                    name: closestInput.name,
                                    value: closestInput.value
                                };
        
                                //dispatch edit event with field data
                                window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                            }
                            break;
            
                            case "email":

                                let validEmail = emailValidation(closestInput, errorField);

                                if (validEmail){
                                    errorField.innerText = "";
                                    errorField.classList.add("d-none");
                                    
                                    //pass the field's data with the event
                                    const editEventData = {
                                        name: closestInput.name,
                                        value: closestInput.value
                                    };
            
                                    //dispatch edit event with field data
                                    window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                                }
                            break;
            
                            case "phone":

                                let validPhone = phoneNumberValidation(closestInput, errorField);

                                if (validPhone){
                                    errorField.innerText = "";
                                    errorField.classList.add("d-none");
                                    
                                    //pass the field's data with the event
                                    const editEventData = {
                                        name: closestInput.name,
                                        value: closestInput.value
                                    };
            
                                    //dispatch edit event with field data
                                    window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                                }
                            break;

                            case "age":
                            case "price":
                            case "discount":
            
                                let isValidMinLen = minLengthValidation(closestInput, errorField, 1, "El campo debe tener al menos 1 caracter");
                                let isValidMaxLeng = maxLengthValidation(closestInput, errorField, 20, "El campo no puede exceder los 20 caracteres");
                                let isValidNum = isNum(closestInput, errorField);
        
                                if (isValidMinLen && isValidMaxLeng && isValidNum){
            
                                    errorField.innerText = "";
                                    errorField.classList.add("d-none");
                                        
                                    //pass the field's data with the event
                                    const editEventData = {
                                        name: closestInput.name,
                                        value: closestInput.value
                                    };
        
                                    //dispatch edit event with field data
                                    window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                                }
                            break;

                            default:
                                        
                                let isValidMinLength = minLengthValidation(closestInput, errorField, 3, "El campo debe tener al menos 3 caracteres");
                                let isValidMaxLength = maxLengthValidation(closestInput, errorField, 20, "El campo no puede exceder los 20 caracteres");

                                if (isValidMinLength && isValidMaxLength) {

                                    errorField.innerText = "";
                                    errorField.classList.add("d-none");
                                    
                                    //pass the field's data with the event
                                    const editEventData = {
                                        name: closestInput.name,
                                        value: closestInput.value
                                    };
            
                                    //dispatch edit event with field data
                                    window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                                }
                            break;
                        }
                    }
                }
            });
        });
    }

    //event listener for edit btn
    for (const btn of btnsConfirm) {
        btn.addEventListener("click", () => {
            //container and elements
            const container = btn.parentElement;
            const closestParagraph = container.querySelector('p');
            const closestInput = container.querySelector('input');
            const closestEdit = container.querySelector('.bx-edit-alt');
            const closestCancel = container.querySelector('.bxs-x-circle');

            let errorField = container.parentElement.parentElement.querySelector('p');

            //check validations
            if (closestInput.value) {

                switch (closestInput.name) {
                    case "name":
                    case "surname":
                    case "city":
                    case "region":
                    case "country":
    
                    let validMinLength = minLengthValidation(closestInput, errorField, 3, "El campo debe tener al menos 3 caracteres");
                    let validMaxLength = maxLengthValidation(closestInput, errorField, 20, "El campo no puede exceder los 20 caracteres");
                    let validChar = isAlpha(closestInput, errorField);

                    if (validMinLength && validMaxLength && validChar) {

                        errorField.innerText = "";
                        errorField.classList.add("d-none");

                        //toggle visibily of p and input elements
                        closestParagraph.classList.toggle('d-none');
                        closestInput.classList.toggle('d-none');
                        btn.classList.toggle('d-none');
                        closestCancel.classList.toggle('d-none');
                        closestEdit.classList.toggle('d-none');
                        
                        //pass the field's data with the event
                        const editEventData = {
                            name: closestInput.name,
                            value: closestInput.value
                        };

                        //dispatch edit event with field data
                        window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                    }
                    break;
    
                    case "email":

                        let validEmail = emailValidation(closestInput, errorField);

                        if (validEmail){

                            errorField.innerText = "";
                            errorField.classList.add("d-none");

                            //toggle visibily of p and input elements
                            closestParagraph.classList.toggle('d-none');
                            closestInput.classList.toggle('d-none');
                            btn.classList.toggle('d-none');
                            closestCancel.classList.toggle('d-none');
                            closestEdit.classList.toggle('d-none');
                            
                            //pass the field's data with the event
                            const editEventData = {
                                name: closestInput.name,
                                value: closestInput.value
                            };
    
                            //dispatch edit event with field data
                            window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                        }
                    break;
    
                    case "phone":

                        let validPhone = phoneNumberValidation(closestInput, errorField);

                        if (validPhone){

                            errorField.innerText = "";
                            errorField.classList.add("d-none");

                            //toggle visibily of p and input elements
                            closestParagraph.classList.toggle('d-none');
                            closestInput.classList.toggle('d-none');
                            btn.classList.toggle('d-none');
                            closestCancel.classList.toggle('d-none');
                            closestEdit.classList.toggle('d-none');
                                
                            //pass the field's data with the event
                            const editEventData = {
                                name: closestInput.name,
                                value: closestInput.value
                            };
    
                            //dispatch edit event with field data
                            window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                        }
                    break;

                    case "age":
                    case "price":
                    case "discount":

                        let isValidMinLen = minLengthValidation(closestInput, errorField, 1, "El campo debe tener al menos 1 caracter");
                        let isValidMaxLeng = maxLengthValidation(closestInput, errorField, 20, "El campo no puede exceder los 20 caracteres");
                        let isValidNum = isNum(closestInput, errorField);

                        if (isValidMinLen && isValidMaxLeng && isValidNum){

                            errorField.innerText = "";
                            errorField.classList.add("d-none");
                                
                            //pass the field's data with the event
                            const editEventData = {
                                name: closestInput.name,
                                value: closestInput.value
                            };

                            //dispatch edit event with field data
                            window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                        }
                    break;

                    default:
                                        
                        let isValidMinLength = minLengthValidation(closestInput, errorField, 3, "El campo debe tener al menos 3 caracteres");
                        let isValidMaxLength = maxLengthValidation(closestInput, errorField, 20, "El campo no puede exceder los 20 caracteres");

                        if (isValidMinLength && isValidMaxLength) {

                            errorField.innerText = "";
                            errorField.classList.add("d-none");
                            
                            //pass the field's data with the event
                            const editEventData = {
                                name: closestInput.name,
                                value: closestInput.value
                            };

                            //dispatch edit event with field data
                            window.dispatchEvent(new CustomEvent('profileEdited', { detail: editEventData }));
                        }
                    break;
                }
            }
        });
    }

    //event listener for edit btn
    for (const btn of btnsCancel) {
        btn.addEventListener("click", () => {
            //container and elements
            const container = btn.parentElement;
            const closestParagraph = container.querySelector('p');
            const closestInput = container.querySelector('input');
            const closestConfirm = container.querySelector('.bxs-check-circle');
            const closestEdit = container.querySelector('.bx-edit-alt');

            //toggle visibily of p and input elements
            closestParagraph.classList.toggle('d-none');
            closestInput.classList.toggle('d-none');
            closestConfirm.classList.toggle('d-none');
            btn.classList.toggle('d-none');
            closestEdit.classList.toggle('d-none');

            //erase error messages if there are any
            let errorField = container.parentElement.parentElement.querySelector('p');

            if(errorField.innerText != ""){
                errorField.innerText = "";
                errorField.classList.add("d-none");
            }

        });
    }
}