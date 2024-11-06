//functionality for buttons
export const carouselFunctionality = (buttons) => {

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            //add or substract based on button attribute
            const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    
            //get bundle with all the slides
            const slides = button
                .closest("[data-carousel]")
                .querySelector("[data-slides]");
    
            //check active slide
            const activeSlide = slides.querySelector("[data-active]");
            //get index of new slide
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    
            //loop through border slides
            if (newIndex < 0) {
                newIndex = slides.children.length -1;
            } 
            if (newIndex >= slides.children.length) {
                newIndex = 0;
            }
    
            //set new slide as active
            slides.children[newIndex].dataset.active = true;
            //unset old slide as active
            delete activeSlide.dataset.active;
        });
    });
    
}

