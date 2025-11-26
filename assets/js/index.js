// ===============================
// BOOK DATA
// ===============================
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
        title: "THE OTHER WOMAN ",
        author: "F. Scott Fitzgerald",
        genre: "Classic Literature",
        shortDesc: "A story of wealth, love, and illusion in the Jazz Age.",
        longDesc:
            "A classic novel of the Jazz Age following Nick Carraway as he observes the mysterious Jay Gatsby and his pursuit of the American Dream, exploring themes of illusion, love, and societal decay in 1920s America.",
        cover: "../assets/images/p1.jpg",
        available: true,
        year: 1925
    },
    {
        id: 2,
        title: "FIRST LADIES",
        author: "Marie Benedict & Vectoria Christopher Murray",
        genre: "Fiction",
        shortDesc: "A powerful story about justice and innocence.",
        longDesc:
            "A profound narrative set in the American South, seen through the eyes of young Scout Finch as her father defends a Black man falsely accused of a crime, exploring racism, morality, and childhood innocence.",
        cover: "../assets/images/p2.jpg",
        available: true,
        year: 1960
    },
    {
        id: 3,
        title: "امينة المكتبة",
        author: "Marie Benedict & Vectoria Christopher Murray",
        genre: "Dystopian Fiction",
        shortDesc: "A dark vision of a future ruled by total control.",
        longDesc:
            "A chilling dystopian novel depicting a society under constant surveillance by Big Brother, where critical thinking is forbidden and individual freedom is crushed under a totalitarian regime.",
        cover: "../assets/images/p3.jpg",
        available: false,
        year: 1949
    },
    {
        id: 4,
        title: "THE DIAMOND EYE",
        author: "Jane Austen",
        genre: "Romance",
        shortDesc: "A timeless romance shaped by society and personal growth.",
        longDesc:
            "A classic tale following Elizabeth Bennet as she navigates societal expectations, misunderstandings, and her evolving relationship with Mr. Darcy, exploring themes of love, class, and self-awareness.",
        cover: "../assets/images/p4.jpg",
        available: true,
        year: 1813
    },
    {
        id: 5,
        title: "مدينة القوباء",
        author: "د.اسلام محمد ابوفرحة",
        genre: "Classic Literature",
        shortDesc: "A story of wealth, love, and illusion in the Jazz Age.",
        longDesc:
            "A classic novel of the Jazz Age following Nick Carraway as he observes the mysterious Jay Gatsby and his pursuit of the American Dream, exploring themes of illusion, love, and societal decay in 1920s America.",
        cover: "../assets/images/p5.jpg",
        available: true,
        year: 1925
    },
    {
        id: 6,
        title: "دندنة",
        author: "خميلة الجندي",
        genre: "Fiction",
        shortDesc: "A powerful story about justice and innocence.",
        longDesc:
            "A profound narrative set in the American South, seen through the eyes of young Scout Finch as her father defends a Black man falsely accused of a crime, exploring racism, morality, and childhood innocence.",
        cover: "../assets/images/p6.jpg",
        available: true,
        year: 1960
    },
    {
        id: 7,
        title: "Mysteries of the ocean",
        author: "Alexander Cardinal",
        genre: "Dystopian Fiction",
        shortDesc: "A dark vision of a future ruled by total control.",
        longDesc:
            "A chilling dystopian novel depicting a society under constant surveillance by Big Brother, where critical thinking is forbidden and individual freedom is crushed under a totalitarian regime.",
        cover: "../assets/images/p7.jpg",
        available: false,
        year: 1949
    },
    {
        id: 8,
        title: "Writing you In The stars",
        author: "Samsya Hamida",
        genre: "Romance",
        shortDesc: "A timeless romance shaped by society and personal growth.",
        longDesc:"A classic tale following Elizabeth Bennet as she navigates societal expectations, misunderstandings, and her evolving relationship with Mr. Darcy, exploring themes of love, class, and self-awareness.",
        cover: "../assets/images/p8.jpg",
        available: true,
        year: 1813
    }
];


// ===============================
// DISPLAY BOOKS
// ===============================
const bookList = document.getElementById("book-list");

books.forEach(book => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";

    col.innerHTML = `
        <div class="card book-card shadow-sm h-100">
            <img src="${book.cover}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="text-muted mb-2">by ${book.author}</p>

                <p class="short-description">${book.shortDesc}</p>

                <p class="long-description d-none">${book.longDesc}</p>

                <button class="btn btn-link p-0 read-more-btn">Read More</button>
            </div>
        </div>
    `;

    bookList.appendChild(col);

    // Toggle long description
    const btn = col.querySelector(".read-more-btn");
    const longDesc = col.querySelector(".long-description");

    btn.addEventListener("click", () => {
        const isHidden = longDesc.classList.contains("d-none");

        longDesc.classList.toggle("d-none");

        btn.textContent = isHidden ? "Read Less" : "Read More";
    });
});
});