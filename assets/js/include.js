/**
 * Global JavaScript file for LibraConnect.
 * This file handles two main functions:
 * 1. Asynchronously loads the header and footer HTML snippets into the page.
 * 2. Sets the 'active' class on the current page's link in the navigation bar.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Header and Footer Loading & Active Link Setup ---
    
    // Use an async function to handle loading the external HTML files
    async function loadIncludes() {
        try {
            // 1. Load header - NO DOTS NEEDED
            const headerResponse = await fetch('includes/header.html');
            if (!headerResponse.ok) throw new Error('Header not found or failed to load.');
            const headerHTML = await headerResponse.text();
            
            // Assuming your main HTML uses an ID of 'header' for the nav container
            const headerContainer = document.getElementById('header');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
                initializeMobileMenu(); 
                setActiveLink(); // Execute active link logic AFTER header is loaded
            } else {
                console.error("Target element with ID 'header' not found for header injection.");
            }

            // 2. Load footer - NO DOTS NEEDED
            const footerResponse = await fetch('includes/footer.html');
            if (!footerResponse.ok) throw new Error('Footer not found or failed to load.');
            const footerHTML = await footerResponse.text();
            
            // Assuming your main HTML uses an ID of 'footer' for the footer container
            const footerContainer = document.getElementById('footer');
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            } else {
                console.error("Target element with ID 'footer' not found for footer injection.");
            }

        } catch (error) {
            console.error('Error during HTML include loading:', error);
        }
    }

    // Call the combined loading function
    loadIncludes();
    
    // --- Core Navigation Functionality ---
    
    /**
     * Determines the current page and applies the 'active' class to the 
     * corresponding link in the navigation bar using the IDs defined in header.html.
     */
    function setActiveLink() {
        // Get the current URL pathname (e.g., /project/borrow.html)
        const currentPath = window.location.pathname;
        
        // Extract the filename (e.g., borrow.html)
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        // Map filenames to the link IDs we created (borrow.html -> nav-borrow)
        const pathMap = {
            'index.html': 'nav-home',
            'catalog.html': 'nav-catalog',
            'borrow.html': 'nav-borrow',
            'history.html': 'nav-history',
            'register.html': 'nav-account',
            // Default mappings for root or index pages
            '': 'nav-home' 
        };

        const targetId = pathMap[currentPage] || pathMap['']; 

        if (targetId) {
            const activeLink = document.getElementById(targetId);
            if (activeLink) {
                // Ensure no other link is active
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                // Apply 'active' class to the link matching the current page
                activeLink.classList.add('active');
            }
        }
    }
    
    // --- Mobile Menu Toggle ---
    function initializeMobileMenu() {
        const menuIcon = document.querySelector('.menu-icon');
        const nav = document.getElementById('main-nav');
        
        if (menuIcon && nav) {
            menuIcon.addEventListener('click', () => {
                nav.classList.toggle('open');
                menuIcon.textContent = nav.classList.contains('open') ? '✕' : '☰';
            });
        }
    }
});