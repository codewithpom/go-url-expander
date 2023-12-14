// content.js

// Function to handle the hover event
function handleHover(event) {
    // Get the hovered link
    const hoveredLink = event.target;

    const link = hoveredLink.href;
    // make fetch request to https://localgost:4567/expand?url=link
    fetch(`https://localhost:4567/expand?url=${link}`)
        .then(response => response.json())
        .then(data => {
            // Get the expanded url
            const expandedUrl = data.r;
            // Set the title attribute of the hovered link to the expanded url
            hoveredLink.title += `\nShortener Pro:\nLink: expandedUrl\n`;
        })
        .catch(error => console.log(error));
}



// Add event listener to all links
const allLinks = document.querySelectorAll('a');
allLinks.forEach(link => {
    link.addEventListener('mouseover', handleHover);
});
