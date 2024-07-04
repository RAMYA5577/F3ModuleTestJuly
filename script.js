// Define the API URL
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let originalData=[]; 
const searchInput = document.getElementById('search-input');

// Function to fetch data using async await
async function fetchDataAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch data using .then syntax
 async function fetchDataThen() {
    await fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Populate the table with fetched data
function populateTable(data) {
    const tableBody = document.getElementById('crypto-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

        //populating the table
    data.forEach((crypto) => {
        originalData.push(crypto);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td id="wid"><img src="${crypto.image}" alt="${crypto.name}" width="30">${crypto.name}</td>
            <td id="upperCase">${crypto.symbol}</td>
            <td><span>$ </span> ${crypto.current_price}</td>
            <td><span>$ </span>${crypto.total_volume}</td>
            <td id="green">${crypto.price_change_percentage_24h}<span>%</span></td>
            <td><span>Mkt Cap: $ </span> ${crypto.market_cap}</td> 
        `;
        tableBody.appendChild(row);
    });
}

    console.log(originalData);
    //calling gettingApiDataIntoArray() to save the table details into array
    // gettingAPIDataIntoArray(data);


function sortTableData(filteredData){
    const tableBody = document.getElementById('crypto-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    filteredData.forEach((crypto) => {
        const row= document.createElement('tr');
        row.innerHTML = `
            <td id="wid"><img src="${crypto.image}" alt="${crypto.name}" width="30">${crypto.name}</td>
            <td id="upperCase">${crypto.symbol}</td>
            <td><span>$ </span> ${crypto.current_price}</td>
            <td><span>$ </span>${crypto.total_volume}</td>
            <td id="green">${crypto.price_change_percentage_24h}<span>%</span></td> 
            <td><span>Mkt Cap: $ </span> ${crypto.market_cap}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial data fetch and table population
// fetchDataAsyncAwait(); // or fetchDataThen(); to use .then approach initially
fetchDataThen();


  
  // Event listener for input changes in the search bar
searchInput.addEventListener('keyup', () => {
    
    let searchTerm = searchInput.value.trim().toLowerCase();
    if(searchTerm=="" || searchTerm==" ") {
        sortTableData(originalData);
    }
    else{
        const filteredTable = originalData.filter(data =>
            data.name.toLowerCase().includes(searchTerm) ||
            data.symbol.toLowerCase().includes(searchTerm)
          );
        sortTableData(filteredTable);
    } // Filter and render based on the current search term
  });
  
function handleSortByPercentage() {    
    const sortedData = [...originalData].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    sortTableData(sortedData);
}

function handleSortByMktCap(){
    const sortedData=[...originalData].sort((a,b)=> a.market_cap - b.market_cap);
    sortTableData(sortedData);
}
