//display content of products json into container
export const displayReviews = (reviewsList, container) => {

    //final template storage
    let template = "";
    let ratingTemplate = "";

    //add each product's info into literal template
    reviewsList.forEach((review, index) => {

            //set rating template
            switch (parseFloat(review.rating)) {
        
                case 5:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star' ></i>`
                    break;
                
                case 4.5:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star-half' ></i>`
                    break;        
                
                case 4:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bx-star'></i>`
                    break;       
                
                case 3.5:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star-half'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>`
                    break;        
                
                case 3:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>`
                    break;
    
                case 2.5:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star-half'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>`
                    break;
    
                case 2:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>`
                    break;
    
                case 1.5:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bxs-star-half'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>`
                    break;
    
                case 1:
                    ratingTemplate = 
                    `<i class='bx bxs-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star-half'></i>`
                    break;
    
                case 0.5:
                    ratingTemplate = 
                    `<i class='bx bxs-star-half'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>`
                    break;
    
                default:
                    ratingTemplate = 
                    `<i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star-half'></i>`
                    break;
            }

        //add filled product's template into variable
        template += `<li class="review-card slide" id=${"ad-"+ review.id} ${index === 0 ? "data-active" : ""}>

                        <div class="review-card-img" style="background-image: url(${review.image});">
                        </div>

                        <div class="review-card-rating">
                            ${ratingTemplate}
                        </div>
                    
                        <p> 
                        ${review.text}
                        </p>

                        <h4> ${review.name}</h4>
                        <h6> ${review.location}</h6>
                    </li>`;
    });

    //set container's content as template
    container.innerHTML = template;
}

