document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the necessary HTML elements
    const availableList = document.getElementById('available-list');
    const selectedList = document.getElementById('selected-list');
    const borrowButton = document.getElementById('borrow-button');
    const noSelectionMessage = document.getElementById('no-selection-message');

    // 2. Attach an event listener to the entire list of available books
    availableList.addEventListener('change', updateSelection);

    // 3. The main function to handle checkbox changes
    function updateSelection(event) {
        // Ensure the change event came from a checkbox
        if (event.target.type !== 'checkbox') return;

        // Get all checked (selected) checkboxes that are NOT disabled
        const selectedCheckboxes = Array.from(availableList.querySelectorAll('input[type="checkbox"]:checked:not([disabled])'));
        
        // Clear the current list of selected books in the right column
        selectedList.innerHTML = '';

        // Update the display for each selected book
        selectedCheckboxes.forEach(checkbox => {
            const title = checkbox.getAttribute('data-title');
            const author = checkbox.getAttribute('data-author');

            const listItem = document.createElement('li');
            listItem.textContent = `${title} by ${author}`;
            selectedList.appendChild(listItem);
        });

        // 4. Update the 'No books selected' message visibility
        const selectionCount = selectedCheckboxes.length;
        
        if (selectionCount > 0) {
            noSelectionMessage.style.display = 'none'; // Hide the message
            borrowButton.disabled = false; // Enable the button
        } else {
            noSelectionMessage.style.display = 'block'; // Show the message
            borrowButton.disabled = true; // Disable the button
        }

        // 5. Update the borrow button text
        borrowButton.textContent = `Borrow Selected Books (${selectionCount})`;
    }

    // You would typically add an event listener for the actual borrowing process here
    borrowButton.addEventListener('click', () => {
        const selectedBooks = Array.from(availableList.querySelectorAll('input[type="checkbox"]:checked:not([disabled])'))
                                .map(cb => cb.getAttribute('data-title'));
        
        // This is a placeholder for the server-side borrowing logic
        alert(`You are attempting to borrow: \n- ${selectedBooks.join('\n- ')}`);
        
        // In a real application, you would make an AJAX/Fetch request to the server here.
    });
});