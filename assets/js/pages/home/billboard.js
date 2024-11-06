//display content of billboard json into container
export const displayBillboard = (adList, container) => {

    //final template storage
    let template = "";

    //add each ad's info into literal template
    adList.forEach((ad, index) => {

        //add filled ad's template into variable
        template += `<li id=${"ad-"+ ad.id} class="slide" ${index === 0 ? "data-active" : ""}>
    
                        <img src=${ad.image} alt=${"image of ad: " + ad.title}>

                        <div class="ad-content">
                            <h5 class="ad-tag"> ${ad.tag}</h5>
                            <h1 class="ad-title"> ${ad.title} </h1>
                            <p class="ad-description"> 
                                ${ad.description}
                            </p>
                            <a href=${ad.link} class="ad-btn"> ¡Ir al catalogo!<i class='bx bx-right-arrow-alt'></i> </a>
                        </div>

                    </li>`;
    });

    //set container's content as template
    container.innerHTML = template;
}

