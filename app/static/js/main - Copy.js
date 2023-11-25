(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

 


    const API_KEY = "81ab31125789471097c9e5c8c0b1440e";
    const newsUrl = `https://newsapi.org/v2/everything?q=india&apiKey=${API_KEY}&pageSize=10`;
    function fetchAndDisplayNews() {
        fetch(newsUrl)
            .then(response => response.json())
            .then(data => {
                const newsContainer = document.getElementById("news-container");

                if (data.articles) {
                    data.articles.forEach(article => {
                        const articleDiv = document.createElement("div");
                        articleDiv.className = "news-article bg-dark rounded p-4";

                        const articleTitle = document.createElement("h5");
                        articleTitle.className = "text-white mb-2";
                        articleTitle.textContent = article.title;

                        const articleContent = document.createElement("p");
                        articleContent.className = "text-white";
                        articleContent.textContent = article.description;

                        const readMoreButton = document.createElement("a");
                        readMoreButton.className = "btn btn-primary btn-sm";
                        readMoreButton.textContent = "Read More";
                        readMoreButton.href = article.url;
                        readMoreButton.target = "_blank";

                        articleDiv.appendChild(articleTitle);
                        articleDiv.appendChild(articleContent);
                        articleDiv.appendChild(readMoreButton);
                        newsContainer.appendChild(articleDiv);
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });
    }

    // Search Functionality
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const articles = document.querySelectorAll(".news-article");

        articles.forEach(article => {
            const title = article.querySelector("h5").textContent.toLowerCase();
            const description = article.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }

    searchButton.addEventListener("click", performSearch);

    // Call the function to fetch and display news when the page loads
    fetchAndDisplayNews();

})(jQuery);
