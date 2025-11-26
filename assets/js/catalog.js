// =============================================
// SECTION 1: BOOK DATA ARRAY
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    
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
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic Literature",
        description: "A classic novel of the Jazz Age, depicting the decadence and excess of the 1920s through the eyes of narrator Nick Carraway.",
        cover: "../assets/images/greatgatsby.jpeg",
        available: true,
        year: 1925
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A gripping tale of racial injustice and childhood innocence in the American South, seen through the eyes of young Scout Finch.",
        cover: "../assets/images/tokillamockingbird.jpeg",
        available: true,
        year: 1960
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        description: "A chilling vision of a totalitarian future where critical thought is suppressed under the watchful eye of Big Brother.",
        cover: "../assets/images/1984.jpg",
        available: false,
        year: 1949
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        description: "A timeless romance exploring societal expectations and personal growth in 19th century England.",
        cover: "../assets/images/prideandprejudice.jpg",
        available: true,
        year: 1813
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "An epic fantasy adventure that follows Bilbo Baggins on an unexpected journey to reclaim the Lonely Mountain.",
        cover: "../assets/images/thehobbit.jpeg",
        available: true,
        year: 1937
    },
    {
        id: 6,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        description: "The first book in the beloved series about a young wizard's journey at Hogwarts School of Witchcraft and Wizardry.",
        cover: "../assets/images/harrypot.jpeg", 
        available: true,
        year: 1997
    },
    {
        id: 7,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        description: "A controversial novel exploring teenage rebellion and alienation through the eyes of protagonist Holden Caulfield.",
        cover: "../assets/images/rey.jpeg",
        available: false,
        year: 1951
    },
    {
        id: 8,
        title: "Lord of the Flies",
        author: "William Golding",
        genre: "Fiction",
        description: "A harrowing tale of a group of boys stranded on an uninhabited island and their descent into savagery.",
        cover: "../assets/images/lordoftheflies.jpeg",
        available: true,
        year: 1954
    },
    {
        id: 9,
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        description: "A visionary novel about a futuristic society where people are genetically engineered and conditioned for specific roles.",
        cover: "../assets/images/bravenewworld.jpeg",
        available: true,
        year: 1932
    },
    {
        id: 10,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Adventure",
        description: "A philosophical book that follows a young Andalusian shepherd on his journey to find his Personal Legend.",
        cover: "../assets/images/alchemist.jpg",
        available: true,
        year: 1988
    },
    {
        id: 11,
        title: "Omniscient Reader's Viewpoint",
        author: "singNsong",
        genre: "Action, Fantasy, Metafiction",
        description: "Kim Dokja is a young man leading a simple life, who has been the sole reader of a novel, Three Ways to Survive in a Ruined World, alternatively translated as Ways of Survival, for 13 years of his life. On the day the final chapter was published, reality and fiction began to merge, becoming the world of the story. Being the only person who knew how the story went, Kim Dokja is determined to create a different ending through various challenges",
        cover: "../assets/images/orv.jpg",
        available: true,
        year: 2018
    }
];

// =============================================
// SECTION 2: CARD CREATION AND RENDERING
// =============================================

// Enhanced function to create individual book card with better image handling
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-title', book.title.toLowerCase());
    bookCard.setAttribute('data-author', book.author.toLowerCase());
    bookCard.setAttribute('data-genre', book.genre.toLowerCase());
    
    bookCard.innerHTML = `
        <div class="book-cover-container">
            <img src="${book.cover}" class="book-cover" alt="${book.title}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjUgMTUwSDE3NVYyNTBIMTI1VjE1MFoiIGZpbGw9IiNEOEQ4RDgiLz4KPHN2Zz4K'; this.alt='Cover image not available'">
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-description">${book.description}</p>
            <div class="book-meta">
                <span class="genre-tag">${book.genre}</span>
                <span class="availability ${book.available ? 'available' : 'unavailable'}">
                    ${book.available ? 'Available' : 'Checked Out'}
                </span>
            </div>
            <div class="book-year">
                <small class="text-muted">Published: ${book.year}</small>
            </div>
            <button class="borrow-btn" ${!book.available ? 'disabled' : ''}>
                ${book.available ? 'Borrow This Book' : 'Currently Unavailable'}
            </button>
        </div>
    `;
    
    return bookCard;
}

// Function to render books with enhanced responsive design
function renderBooks(booksToRender) {
    const booksContainer = document.getElementById('booksContainer');
    const noResults = document.getElementById('noResults');
    
    if (!booksContainer || !noResults) {
        console.error('Required DOM elements not found');
        return;
    }
    
    // Clear previous content
    booksContainer.innerHTML = '';
    
    if (booksToRender.length === 0) {
        noResults.style.display = 'block';
        updateResultsCounter(0);
        return;
    }
    
    noResults.style.display = 'none';
    updateResultsCounter(booksToRender.length);
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Loop through book data and create cards
    booksToRender.forEach(book => {
        const bookCard = createBookCard(book);
        fragment.appendChild(bookCard);
    });
    
    booksContainer.appendChild(fragment);
}

// =============================================
// SECTION 3: SEARCH AND FILTERING
// =============================================

// FIXED: Search function that properly handles multi-genre books
function filterBooks() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (!searchInput || !genreFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;
    
    let filteredBooks = books;
    
    // Apply genre filter if selected - FIXED TO HANDLE EXACT GENRE MATCHING
    if (selectedGenre !== '') {
        filteredBooks = filteredBooks.filter(book => {
            // Split the book's genre string into individual genres
            const bookGenres = book.genre.split(', ').map(genre => genre.trim().toLowerCase());
            const selectedGenreLower = selectedGenre.toLowerCase();
            
            // Check if any of the individual genres exactly matches the selected genre
            return bookGenres.some(genre => genre === selectedGenreLower);
        });
    }
    
    // Apply search filter if there's a search term
    if (searchTerm !== '') {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm)
        );
    }
    
    renderBooks(filteredBooks);
}

// =============================================
// SECTION 4: UTILITY FUNCTIONS
// =============================================

// Enhanced responsive grid system
let currentGridColumns = calculateGridColumns();

function calculateGridColumns() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
}

// Function to update results counter
function updateResultsCounter(count) {
    let counter = document.getElementById('resultsCounter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'resultsCounter';
        counter.className = 'results-counter';
        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            searchSection.appendChild(counter);
        }
    }
    
    if (count === books.length || count === 0) {
        counter.style.display = 'none';
    } else {
        counter.style.display = 'block';
        counter.textContent = `Found ${count} book${count !== 1 ? 's' : ''}`;
    }
}

// Enhanced debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =============================================
// SECTION 5: APP INITIALIZATION
// =============================================

// Initialize the application with error handling
function initializeApp() {
    try {
        // Initial render of all books
        renderBooks(books);
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const genreFilter = document.getElementById('genreFilter');
        
        if (!searchInput || !searchButton || !genreFilter) {
            console.error('Search elements not found');
            return;
        }
        
        const debouncedFilter = debounce(filterBooks, 300);
        
        // Live search with keyup event
        searchInput.addEventListener('keyup', debouncedFilter);
        
        // Search button event
        searchButton.addEventListener('click', filterBooks);
        
        // Genre filter change event
        genreFilter.addEventListener('change', filterBooks);
        
        // Clear search when input is emptied
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                filterBooks();
            }
        });
        
        // Enter key support
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterBooks();
            }
        });
        
        // responsive layout handling
        window.addEventListener('resize', debounce(function() {
            const newGridColumns = calculateGridColumns();
            if (newGridColumns !== currentGridColumns) {
                currentGridColumns = newGridColumns;
                renderBooks(books);
            }
        }, 250));
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                genreFilter.value = '';
                renderBooks(books);
                searchInput.focus();
            }
        });
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
});