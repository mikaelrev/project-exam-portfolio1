const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://movieblog.flower-power.one/wp-json/wp/v2/posts/" + id + "?_embed";
const blogDetailContainer = document.querySelector(".blog-details");

async function fetchDetails(url) {
    try {
        const response = await fetch(url);
        const details = await response.json();
        
        // blogDetailContainer.innerHTML = ``;

        document.title = `Witness The Fitness | ` + `${details.title.rendered}`

        blogDetails(details);
    }
    catch(error) {
        console.log(error);
    }
}

fetchDetails(url);

function blogDetails(details) {
    blogDetailContainer.innerHTML = 
    `<div class="post-image"><img src="${details._embedded['wp:featuredmedia']['0'].source_url}"></div>
    <h2>${details.title.rendered}</h2>
    ${details.content.rendered}`;
}