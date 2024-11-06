//■■■■■ ChangeContent-Open-Close dialog window ■■■■■

//body
export const pageContent = document.getElementById("page-content");

//modal
export const modal = document.querySelector("dialog");
export const modalContent = document.getElementById("modal-content");

//close modal btn
export const btnCloseModal = document.getElementById("btn-modal-close");

//change content modal
export const changeModal = (template) => {
    modalContent.innerHTML = template;
};

export const openModal = (template = "") => {
    //potential issue
    template && changeModal(template); 
    
    modal.setAttribute("open", "");
    pageContent.classList.add("overlay");
};

export const closeModal = () => {
        changeModal("");
        modal.removeAttribute("open");
        pageContent.classList.remove("overlay");
};

//btn close modal
btnCloseModal.addEventListener("click", () => {
    closeModal();
});

//key Esc event for closing modals
document.addEventListener("keydown", function(event) {

    //check if modal is opened
    if (modal.hasAttribute("open")) {

        //close modal on Esc key pressed
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal();
        }
    }
});