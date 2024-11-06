//display content of articles json into container
export const displayBlogArticles = (articlesList, container) => {

    //final template storage
    let template = "";

    //add each article's info into literal template
    articlesList.forEach((article) => {
        //add to display only the last 3 articles
        if (parseInt(article.id) > articlesList.length -3) {
            //add filled article's template into variable
            template += 
            `<article id="blog-card ${"article-"+ article.id}" class="blog-card" aria-label= "${"articulo sobre: "+ article.title}">
                <a href=${article.link}>
                    <img class="blog-card-img" src=${article.image} alt="${"imagen de: "+ article.title}">
                </a>
                <h6 class="blog-card-date"> ${article.date} </h6>
                <h4>${article.title}</h4>
                <p>
                    ${article.summary}
                </p>
                <a href=${article.link} class="blog-card-continue">
                    <h6> Seguir leyendo... </h6>
                </a>
            </article>`;
        }

    });

    //set container's content as template
    container.innerHTML = template;
}
