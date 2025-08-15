const apiKey = "078c7c1dbbf34680a8a7344fb390adca";
const blogContainer = document.getElementById("blog_container");

const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

async function fetchRandomNews(){
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;

        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;

    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;

    } catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog_card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        // title.textContent = article.title;
        const truncatedTitle = article.title.length > 50? article.title.slice(0, 50) + "..." : 
        article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedTDesc = article.description.length > 100? article.description.slice(0, 100) + "..." : 
        article.description;
        description.textContent = truncatedTDesc;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);

    })
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news", error);
    }
})();