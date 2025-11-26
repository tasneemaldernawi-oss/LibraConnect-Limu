document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all necessary HTML elements
    const bookListContainer = document.getElementById('available-list');
    const selectedList = document.getElementById('selected-list');
    const noSelectionMessage = document.getElementById('no-selection-message');
    const borrowButton = document.getElementById('borrow-button');
    
    
    // --- Header and Footer Loading & Active Link Setup ---
    
    // Use an async function to handle loading the external HTML files
     // Load header
    fetch('../components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header not found');
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading header:', error);
            document.getElementById('header').innerHTML = '<p>Error loading navigation</p>';
        });
              // Load footer
        fetch('../components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                document.getElementById('footer').innerHTML = '<p>Error loading footer</p>';
            });

    // Safety check: exit if essential elements are missing
    if (!bookListContainer || !selectedList || !noSelectionMessage || !borrowButton) {
        console.error("Borrowing script failed to initialize: Missing required HTML elements (IDs).");
        return;
    }

    // --- Core Functions ---

    /**
     * Attempts to read selections from localStorage (e.g., from a Catalog page)
     * and pre-check the corresponding checkboxes.
     */
    function loadPreSelectedBooks() {
        try {
            // Retrieve the array of book titles that were supposedly selected on a previous page
            const savedSelections = JSON.parse(localStorage.getItem('selectedBooksForBorrowing')) || [];
            
            if (savedSelections.length > 0) {
                savedSelections.forEach(savedBookTitle => {
                    // Find the checkbox that matches the saved title and is NOT disabled
                    const checkbox = bookListContainer.querySelector(
                        `input[type="checkbox"][data-title="${savedBookTitle}"]:not(:disabled)`
                    );
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
                // Clear the local storage item after loading them
                localStorage.removeItem('selectedBooksForBorrowing');
            }
        } catch (e) {
            console.warn("Could not load pre-selected books from storage.", e);
        }
    }

    /**
     * Updates the Selected Books list and the Borrow button state based on checked boxes.
     * @returns {NodeListOf<Element>} The list of currently checked books.
     */
    function updateSelectedBooks() {
        selectedList.innerHTML = ''; // Clear the current list
        
        // Find all checkboxes that are checked and not disabled
        const checkedBooks = bookListContainer.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
        const selectedCount = checkedBooks.length;

        if (selectedCount > 0) {
            noSelectionMessage.style.display = 'none';

            checkedBooks.forEach(checkbox => {
                const title = checkbox.dataset.title;
                const author = checkbox.dataset.author;
                
                // Format author name nicely
                const displayAuthor = author ? author.replace(/by\s*/i, '').trim() : 'Unknown Author';
                
                const listItem = document.createElement('li');
                listItem.textContent = `${title} by ${displayAuthor}`;
                selectedList.appendChild(listItem);
            });
        } else {
            noSelectionMessage.style.display = 'block';
        }

        // Update the button text and disabled state
        borrowButton.textContent = `Borrow Selected Books (${selectedCount})`;
        borrowButton.disabled = selectedCount === 0;
        
        return checkedBooks;
    }

    // --- Event Listeners ---

    // Listen for changes on the available books list (checkbox clicks)
    bookListContainer.addEventListener('change', (e) => {
        // Check if the target is a checkbox and is not disabled
        if (e.target.type === 'checkbox' && !e.target.disabled) {
            updateSelectedBooks();
        }
    });

    /**
     * Handles the Borrow button click, showing a confirmation message.
     */
    borrowButton.addEventListener('click', () => {
        const booksToBorrow = updateSelectedBooks();
        const count = booksToBorrow.length;
        
        if (count > 0) {
            // Create a nicely formatted list of titles for the confirmation box
            const bookTitles = Array.from(booksToBorrow).map(cb => `\n- ${cb.dataset.title}`).join('');
            
            // Show the native browser confirmation dialog
            const confirmation = confirm(
                `Are you sure you want to borrow the following ${count} book(s)?` + 
                bookTitles +
                '\n\nClick OK to confirm the borrowing transaction.'
            );

            if (confirmation) {
                // *** In a real application, you would make an API call here to record the loan ***
                
                alert(`SUCCESS! You have successfully borrowed ${count} book(s).`);
                
                // Clear the checkboxes after successful "borrowing"
                booksToBorrow.forEach(checkbox => {
                    checkbox.checked = false;
                });
                updateSelectedBooks(); // Re-run to clear the selected list and reset the button
            } else {
                alert("Borrowing cancelled.");
            }
        }
    });

    // --- Initialization ---

    // 1. Load any pre-selected books from storage
    loadPreSelectedBooks(); 
    // 2. Initial render of the selected books list and button state
    updateSelectedBooks(); 
});