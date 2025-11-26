const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic Literature",
        description: "A classic novel of the Jazz Age, depicting the decadence and excess of the 1920s through the eyes of narrator Nick Carraway.",
        cover: "assets folder/images/greatgatsby.jpeg",
        available: true,
        year: 1925
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A gripping tale of racial injustice and childhood innocence in the American South, seen through the eyes of young Scout Finch.",
        cover: "assets folder/images/tokillamockingbird.jpeg",
        available: true,
        year: 1960
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        description: "A chilling vision of a totalitarian future where critical thought is suppressed under the watchful eye of Big Brother.",
        cover: "assets folder/images/1984.jpg",
        available: false,
        year: 1949
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        description: "A timeless romance exploring societal expectations and personal growth in 19th century England.",
        cover: "assets folder/images/prideandprejudice.jpg",
        available: true,
        year: 1813
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "An epic fantasy adventure that follows Bilbo Baggins on an unexpected journey to reclaim the Lonely Mountain.",
        cover: "assets folder/images/thehobbit.jpeg",
        available: true,
        year: 1937
    },
    {
        id: 6,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        description: "The first book in the beloved series about a young wizard's journey at Hogwarts School of Witchcraft and Wizardry.",
        cover: "assets folder/images/harrypot.jpeg", 
        available: true,
        year: 1997
    },
    {
        id: 7,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        description: "A controversial novel exploring teenage rebellion and alienation through the eyes of protagonist Holden Caulfield.",
        cover: "assets folder/images/rey.jpeg",
        available: false,
        year: 1951
    },
    {
        id: 8,
        title: "Lord of the Flies",
        author: "William Golding",
        genre: "Fiction",
        description: "A harrowing tale of a group of boys stranded on an uninhabited island and their descent into savagery.",
        cover: "assets folder/images/lordoftheflies.jpeg",
        available: true,
        year: 1954
    },
    {
        id: 9,
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        description: "A visionary novel about a futuristic society where people are genetically engineered and conditioned for specific roles.",
        cover: "assets folder/images/bravenewworld.jpeg",
        available: true,
        year: 1932
    },
    {
        id: 10,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Adventure",
        description: "A philosophical book that follows a young Andalusian shepherd on his journey to find his Personal Legend.",
        cover: "assets folder/images/alchemist.jpg",
        available: true,
        year: 1988
    },
    {
        id: 11,
        title: "Omniscient Reader's Viewpoint",
        author: "singNsong",
        genre: "Action, Fantasy, Metafiction",
        description: "Kim Dokja is a young man leading a simple life, who has been the sole reader of a novel, Three Ways to Survive in a Ruined World, alternatively translated as Ways of Survival, for 13 years of his life. On the day the final chapter was published, reality and fiction began to merge, becoming the world of the story. Being the only person who knew how the story went, Kim Dokja is determined to create a different ending through various challenges",
        cover: "assets folder/images/orv.jpg",
        available: true,
        year: 2018
    }
];

// Function to calculate responsive grid columns
function calculateGridColumns() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
}

let currentGridColumns = calculateGridColumns();

// Function to render books
function renderBooks(booksToRender) {
    const booksContainer = document.getElementById('booksContainer');
    const noResults = document.getElementById('noResults');
    
    if (!booksContainer || !noResults) {
        console.error('Required DOM elements not found');
        return;
    }
    
    booksContainer.innerHTML = '';
    
    if (booksToRender.length === 0) {
        noResults.style.display = 'block';
        updateResultsCounter(0);
        return;
    }
    
    noResults.style.display = 'none';
    updateResultsCounter(booksToRender.length);
    
    const fragment = document.createDocumentFragment();
    
    booksToRender.forEach(book => {
        const bookCard = createBookCard(book);
        fragment.appendChild(bookCard);
    });
    
    booksContainer.appendChild(fragment);
}

// Function to create book cards
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
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
    
    // Add click event to borrow button
    const borrowBtn = bookCard.querySelector('.borrow-btn');
    if (borrowBtn && book.available) {
        borrowBtn.addEventListener('click', function() {
            window.location.href = 'borrow.html';
        });
    }
    
    return bookCard;
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

// Search and filter function
function filterBooks() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (!searchInput || !genreFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;
    
    let filteredBooks = books;
    
    if (selectedGenre !== '') {
        filteredBooks = filteredBooks.filter(book => {
            const bookGenres = book.genre.split(', ').map(genre => genre.trim().toLowerCase());
            const selectedGenreLower = selectedGenre.toLowerCase();
            return bookGenres.some(genre => genre === selectedGenreLower);
        });
    }
    
    if (searchTerm !== '') {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm)
        );
    }
    
    renderBooks(filteredBooks);
}

// Debounce function
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

// Initialize the application
function initializeApp() {
    try {
        renderBooks(books);
        
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const genreFilter = document.getElementById('genreFilter');
        
        if (!searchInput || !searchButton || !genreFilter) {
            console.error('Search elements not found');
            return;
        }
        
        const debouncedFilter = debounce(filterBooks, 300);
        
        searchInput.addEventListener('keyup', debouncedFilter);
        searchButton.addEventListener('click', filterBooks);
        genreFilter.addEventListener('change', filterBooks);
        
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                filterBooks();
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterBooks();
            }
        });
        
        window.addEventListener('resize', debounce(function() {
            const newGridColumns = calculateGridColumns();
            if (newGridColumns !== currentGridColumns) {
                currentGridColumns = newGridColumns;
                renderBooks(books);
            }
        }, 250));
        
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

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}