const url = "https://movieblog.flower-power.one/wp-json/wp/v2/posts?_embed"
const latestPosts = document.querySelector(".latest-container");
const showMoreButton = document.querySelector("#show-more");
const searchBtn = document.querySelector(".search-button");

async function fetchPosts(url) {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);
    latestPosts.innerHTML = "";

    getImages(posts);

}

fetchPosts(url);

function getImages(posts) {
    for(let i = 0; i < posts.length; i++) {
        latestPosts.innerHTML += 
        `<div class="latest-thumbnail">
            <img src="${posts[i]._embedded['wp:featuredmedia']['0'].source_url}" />
            <div>
            <h2>${posts[i].title.rendered}</h2>
            ${posts[i].excerpt.rendered}
            <a href="blogpost.html?id=${posts[i].id}">Read More</a>
            </div>
        </div>`
    }     
}

showMoreButton.onclick = function() {
    const newUrl = url + `&per_page=20`;
    fetchPosts(newUrl);
    showMoreButton.style.display = "none";
}

searchBtn.onclick = function() {
    const searchInput = document.querySelector("#search-input").value;
    const newUrl = url + `&search=${searchInput}`;
    latestPosts.innerHTML += "";
    showMoreButton.style.display = "none";
    fetchPosts(newUrl);
}