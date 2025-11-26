document.addEventListener("DOMContentLoaded", ()=>{
    

    fetch("../components/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);
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
    window.toggleDetails= function(id) {
    const box = document.getElementById(`details-${id}`);
    box.classList.toggle("d-none");
   };


const historyData=[
    {
        title:  "The Great Gatsby",
        borrowed: "2024-10-15",
        returned: true,
        returnDate: "2024-10-29",
        fine: 0
    },
    {
        title: "To Kill a Mockingbird",
        borrowed: "2024-11-01",
        returned: false,
        returnDate: "2024-11-15",
        fine: 0
    },
    {
        title: "1984",
        borrowed: "2024-09-20",
        returned: true,
        returnDate: "2024-09-30",
        fine: 8.5
    },
    {
        title: "Pride and Prejudice",
        borrowed: "2024-10-01",
        returned: true,
        returnDate: "2024-10-15",
        fine: "$5.50"

    },
    {
        title: "The Hobbit",
        borrowed: "2024-11-05",
        returned: false,
        returnDate: "2024-11-19",
        fine: "No fine"
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        borrowed: "2024-09-10",
        returned :true,
        returnDate: "2024-09-24",
        fine: "No fine"
    },
    {
        title: "The Catcher in the Rye",
        borrowed: "2024-08-15",
        returned: true,
        returnDate: "2024-09-02",
        fine: "$3.00"

    }
];

function renderHistory(){
    const container = document.getElementById("historyContainer");
    container.innerHTML= "";

    let borrowedCount = 0;
    let overdueCount = 0;
    let totalFines = 0;

    const today = new Date();

    historyData.forEach((item, index) =>{
        if(!item.returned) borrowedCount ++;

        const itemReturn = new Date(item.returnDate);
        if(!item.returned && itemReturn < today) overdueCount ++;

        const fineValue=parseFloat(item.fine)||0;
        totalFines+=fineValue;

        const card = document.createElement("div");
        card.className="card mb-3";

        card.innerHTML= `
             <div class="card-body  ">
               <h5 class="fs-6 text-color ">${item.title}</h5>
               <p class="fs-7 p-color"> Borrowed: ${item.borrowed}
                  <span class="badge bg-${item.returned ? 'success' : 'secondary'} ms-2">${item.returned ? 'Returned': 'Borrowed'}</span>
               </p>
               <button class="btn bg-btn btn-sm" onclick="toggleDetails(${index})">Show Details</button>
               <div id="details-${index}" class="mt-3 d-none">
               <div class="w-100 bg-line mb-3" style="height: 2px;"></div> 
              <div class=" d-flex  gap-3">
                  <div class="details-box mb-2 w-50 bg-details">Return Date: <br> ${item.returnDate}</div>
                  <div class="details-box mb-2 w-50 bg-details">Fine:<br> ${fineValue > 0 ? '$' + fineValue : 'No fine'}</div> 
              </div>
              ${(!item.returned && itemReturn < today) 
                ? `<div class='note-box'>Note: This book is overdue. Please return it as soon as possible to avoid additional fines.</div>` 
                : !item.returned && itemReturn > today
                ? `<div class='note-box'>Note: Please return this book by ${item.returnDate}. </div>`
                : ""}
              
            
            
           </div>
             
             </div>
        
        `;
        container.appendChild(card);

    });
    document.getElementById("countBorrowed").innerText = borrowedCount;
document.getElementById("countOverdue").innerText = overdueCount;
document.getElementById("totalFines").innerText = totalFines.toFixed(2);

}




renderHistory();

});