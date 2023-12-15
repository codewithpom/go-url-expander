// content.js
BASE_URL = 'https://go-url-expander.padmashreejha.repl.co'
// Function to handle the hover event
function handleHover(event) {
    // Get the hovered link
    const hoveredLink = event.target;

    const link = hoveredLink.href;

    // make fetch request to https://localgost:4567/expand?url=link
    hoveredLink.removeEventListener('mouseover', handleHover);
    fetch(`${BASE_URL}/expand?url=${link}`)
        .then(response => response.json())
        .then(data => {
            // Get the expanded url
            const expandedUrl = data.r;
            // Set the title attribute of the hovered link to the expanded url
            hoveredLink.title += `\nShortener Pro:\nLink: ${expandedUrl}\n`;
        })
        .catch(error => console.log(error));


}



// Add event listener to all links
const allLinks = document.querySelectorAll('a');
allLinks.forEach(link => {
    link.addEventListener('mouseover', handleHover);
});

// add event listener for ctrl + y and then changge the title of every link
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'y') {
        allLinks.forEach(link => {
            const hoveredLink = link;
            // remove the event listener
            hoveredLink.removeEventListener('mouseover', handleHover);
            fetch(`${BASE_URL}/expand?url=${link.href}`)
                .then(response => response.json())
                .then(data => {
                    // Get the expanded url
                    const expandedUrl = data.r;
                    // Set the title attribute of the hovered link to the expanded url
                    hoveredLink.title += `\nShortener Bro:\nLink: ${expandedUrl}\n`;
                })
                .catch(error => console.log(error));

        });
    }
});


// add event listener of the suer hovers over a link and presses ctrl
// then change the title of the hovered link to the info of the link by making a request to the server
function get_info_handler(event) {
    const hoveredLink = event.target;
    const link = hoveredLink.href;
    // remove the event listener
    hoveredLink.removeEventListener('mouseover', get_info_handler);
    fetch(`${BASE_URL}/info?url=${link}`)
        .then(response => response.json())
        .then(data => {
            // Get the expanded url
            const title = data.title;
            const description = data.description;
            // Set the title attribute of the hovered link to the expanded url
            hoveredLink.title += `\nShortener Bro Pro:\nTitle: ${expandedUrl}\nDescription: ${description}\n`;
        })
        .catch(error => console.log(error));
    
    
}

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey) {
        allLinks.forEach(link => {
            link.addEventListener('mouseover', handleHover);
        });
    }
});


// add event listener for ctrl + I and then changge the title of every link and set the title to the info of the link
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'i') {
        allLinks.forEach(link => {
            const hoveredLink = link;
            // remove the event listener
            hoveredLink.removeEventListener('mouseover', get_info_handler);
            fetch(`${BASE_URL}/info?url=${link.href}`)
                .then(response => response.json())
                .then(data => {
                    // Get the expanded url
                    const title = data.title;
                    const description = data.description;
                    // Set the title attribute of the hovered link to the expanded url
                    hoveredLink.title += `\nShortener Bro Pro:\nTitle: ${expandedUrl}\nDescription: ${description}\n`;
                })
                .catch(error => console.log(error));

        });
    }
}
);
