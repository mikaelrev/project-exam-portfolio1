let i = 1;
const pageNumber = i;
const url = "https://movieblog.flower-power.one/wp-json/wp/v2/posts?_embed&per_page=4&page=" + pageNumber;
const leftButton = document.querySelector("#slide-left");
const rightButton = document.querySelector("#slide-right");
const sliderContainer = document.querySelector(".slider");

async function fetchPosts(url) {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);
    sliderContainer.innerHTML = "";

    getImages(posts);

}

fetchPosts(url);

function getImages(posts) {
    for(let i = 0; i < posts.length; i++) {
        sliderContainer.innerHTML += 
        `<div class="thumbnail">
            <img src="${posts[i]._embedded['wp:featuredmedia']['0'].source_url}" />
            <h3>${posts[i].title.rendered}</h3>
            ${posts[i].excerpt.rendered}
            <a href="blogpost.html?id=${posts[i].id}">Read More</a>
        </div>`
    }     
}

rightButton.onclick = function() {
    const newUrl = url + `&page=` + ++i;
    fetchPosts(newUrl);
    if(i === 3) {
        rightButton.style = "none";
    }
}

leftButton.onclick = function() {
    const newUrl = url + `&page=` + --i;
    fetchPosts(newUrl);
}
