



// ----------------- DROPDOWN MENU ----------------- //

// Get all second level dropdown items
const secondLevelDropdownItems = document.querySelectorAll('.dropdown-menu > .dropdown-item > .dropdown-menu > .dropdown-item');

// Loop through each second level dropdown item and attach click event listener
secondLevelDropdownItems.forEach(item => {
    item.addEventListener('click', function(event) {

        // Check if the clicked element is a direct child of .dropdown-menu
        if (this.parentNode.classList.contains('dropdown-menu')) {
            // Get the parent dropdown submenu (Ploutos or Les Archanéens)
            const piece = this.closest('.dropdown-menu').parentNode.getAttribute('id');

            // Get the selected text (Coulon or Alfonsi)
            const auteur = this.textContent.trim();

            console.log(piece + "-" + auteur);


            addNewCard(piece, auteur);
        }
    });
});




// ----------------- ADD A NEW CARD ----------------- //
function addNewCard(piece, auteur) {
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {
            
            json_key = piece + "_" + auteur

            const content = data[json_key];

            // Create a new card element
            const newCard = document.createElement('div');
            newCard.classList.add('col-lg-3','col-md-4','col-sm-6', 'gx-1');


            title = piece + " - " + auteur

            // Create card HTML content
            let cardHTML = `
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${title}</h5>
                            <button type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                    <ul class="list-group list-group-flush">
            `;


            // Loop through the data and create list items for each item
            content.forEach(item => {

                // Check if the item has nested content (indicated by an array within the third position)
                if (Array.isArray(item[2])) {
                    const [id, color] = item; // Extract id and color from the item
                    
                    let nestedHTML = `<li id="${id}" class="list-group-item ${color}">`;
                    // Combine all nested speaker/text pairs into one line's HTML
                    item[2].forEach(([title, text]) => {
                        nestedHTML += `<h5>${title} :</h5>${text}`;
                    });

                    nestedHTML += '</li>';
                    cardHTML += nestedHTML;
                    
                } else {

                const [id, color, title, text] = item;
                cardHTML += `
                    <li id="${id}" class="list-group-item ${color}">
                        <h5>${title} : </h5> ${text}
                    </li>
                `;
                }
            });

            // Close the card HTML content
            cardHTML += `
                    </ul>
                </div>
            `;

            // Set the HTML content to the new card
            newCard.innerHTML = cardHTML;
            // 'col-lg-3','col-md-4','col-md-3', 'gx-1'

            const row = document.querySelector('.row-cards');
            row.appendChild(newCard);

            // // Insert the new card after the last column with the specified classes
            // var existingCard = document.querySelector('.container-fluid .row' );
            // existingCard.insertAdjacentElement('afterend', newCard);
            bindHoverEffects();

            

            // Select the CLOSE BUTTON  of the newly created card
            const closeButton = newCard.querySelector('.btn-close');

            // Add click event listener to the close button
            closeButton.addEventListener('click', function() {
                // Find the parent column element
                const column = this.closest('.col-lg-3, .col-md-4, .col-sm-6');
                if (column) {
                    // Remove the column from the DOM
                    column.remove();
                }
            });   // Bind hover effects to new lines


        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}





// ----------------- BIND HOVER-EFFECT ----------------- //

function bindHoverEffects() {
    // Attach event listeners to all list-group-item elements within all cards
    document.querySelectorAll('.card .list-group-item').forEach(function(line) {

        // When the mouse enters over a list-group-item...
        line.addEventListener('mouseenter', function() {
            
            // Get the current card containing this list-group-item
            const currentCard = this.closest('.list-group-flush');
            
            // Find the index of the hovered list-group-item within its card
            const lineId = this.id;

            console.log(lineId);

            document.querySelectorAll('.card .list-group-flush').forEach(function(card) {
                const correspondingLine = card.querySelector(`.list-group-item[id="${lineId}"]`);

                if (correspondingLine) {
                    correspondingLine.classList.add('hover-effect');
                }
            });


                // For each card other than the current card...
                document.querySelectorAll('.card .list-group-flush').forEach(function(card) {
                    // Check if it's not the current card to avoid scrolling the card you're interacting with
                    if (card === currentCard) return; // If it is the current card, do nothing (skip it)
                    
                    // Again, find the corresponding line by index in other cards
                    const correspondingLine = card.querySelector(`.list-group-item[id="${lineId}"]`);
                    // If such a line exists in the other card...
                    if (correspondingLine) {

                        console.log('Found matching line', correspondingLine);
                        // Calculate the scroll amount needed to center the line in the viewport
                        const targetLineTop = correspondingLine.offsetTop; // Distance from the top of the card to the line
                        const targetLineHeight = correspondingLine.offsetHeight; // The height of the line
                        // Calculate the scroll position: line's top position plus half its height minus half the card's height
                        const scrollAmount = targetLineTop + (targetLineHeight / 2) - (card.offsetHeight / 2);
                        // Apply the calculated scroll amount to the card
                        card.scrollTop = scrollAmount;
                }
            });
        });

             // When the mouse leaves a line...
            line.addEventListener('mouseleave', function() {
            // Remove the hover-effect class from all lines in all cards
            document.querySelectorAll('.card .list-group-item').forEach(function(line) {
                line.classList.remove('hover-effect');
            });
        });
    });
}

addNewCard("Ploutos","Coulon")



// ----------------- CLOSE BUTTON FOR HTML (to be deleted)----------------- //


// Select all close buttons
const closeButtons = document.querySelectorAll('.btn-close');

// Add click event listener to each close button
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the parent column element
        const column = this.closest('.col-lg-3, .col-md-4, .col-sm-6');
        if (column) {
            // Remove the column from the DOM
            column.remove();
        }
    });
});




// ----------------- CHANGE FONTSIZE BUTTON ----------------- //


