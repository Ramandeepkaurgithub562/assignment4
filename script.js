// Get the submit button element by its ID
let submitBtn = document.getElementById("submit-btn");

// Function to generate GIFs based on user search input
let generateGif = () => {
    // Clear the wrapper content before displaying new GIFs
    document.querySelector(".wrapper").innerHTML = "";

    // Get the search query from the input box
    let q = document.getElementById("search-box").value;
    let gifCount = 30; // Number of GIFs to fetch
    //  using this link https://developers.giphy.com/docs/api/ to get gif api documentation 
    // Construct the API URL with the query and other parameters
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

    // Fetch GIF data from the Giphy API
    fetch(finalURL)
        .then((resp) => resp.json()) // Parse the JSON response
        .then((info) => {
            let gifsData = info.data; // Extract GIF data
            gifsData.forEach((gif) => {
                // Create a container for each GIF
                let container = document.createElement("div");
                container.classList.add("container");

                // Create an image element and set the GIF source
                let img = document.createElement("img");
                img.setAttribute("src", gif.images.fixed_height.url);
                img.setAttribute("alt", gif.title);

                // Create a button to copy the GIF link to clipboard
                let copyBtn = document.createElement("button");
                copyBtn.innerText = "Copy Link";
                copyBtn.onclick = () => {
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    navigator.clipboard.writeText(copyLink)
                        .then(() => alert("GIF copied to clipboard"))
                        .catch(() => alert("Failed to copy GIF"));
                };

                // Append the image and button to the container
                container.append(img, copyBtn);

                // Append the container to the wrapper
                document.querySelector(".wrapper").append(container);
            });
        });
};

// Function to fetch images from Unsplash based on user search input
let fetchUnsplashImages = (query) => {
    // using this api documentation to get information about api https://unsplash.com/documentation
    // Construct the Unsplash API URL with the query and other parameters
    let unsplashURL = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${query}&per_page=30`;

    // Fetch image data from the Unsplash API
    fetch(unsplashURL)
        .then((resp) => resp.json()) // Parse the JSON response
        .then((data) => {
            let unsplashWrapper = document.querySelector('.wrapper');
            unsplashWrapper.innerHTML = ''; // Clear previous content
            data.results.forEach((image) => {
                // Create a container for each image
                let imgContainer = document.createElement('div');
                imgContainer.classList.add('container');

                // Create an image element and set the image source
                let imgElement = document.createElement('img');
                imgElement.setAttribute('src', image.urls.small);
                imgElement.setAttribute('alt', image.alt_description);

                // Append the image element to the container
                imgContainer.appendChild(imgElement);

                // Append the container to the wrapper
                unsplashWrapper.appendChild(imgContainer);
            });
        })
        .catch((err) => console.error(err)); // Handle errors if the fetch fails
};

// Function to determine whether to generate GIFs or images based on the user's selection
let generateContent = () => {
    let searchType = document.getElementById("search-type").value; // Get the search type (GIF or image)
    let q = document.getElementById("search-box").value; // Get the search query

    // Check the search type and call the appropriate function
    if (searchType === "gif") {
        generateGif(); // Generate GIFs
    } else if (searchType === "image") {
        fetchUnsplashImages(q); // Fetch images
    }
};

// Add an event listener to the submit button to trigger the content generation
submitBtn.addEventListener("click", generateContent);
