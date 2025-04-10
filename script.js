//==========#Step 1 Declare your variables#==========//

const $searchButton = $('#searchButton');
const $searchBar = $('#searchBar');
const $results = $('#results');


//==========#Step 2 Event Listener#==========//
$searchButton.on('click', searchUPC);


//==========#Step 3 Declare Functions to search API#==========//
function searchUPC() {
    const upc = $searchBar.val().trim();

    if (!upc) {
        alert('Please enter a UPC code');
        return;
    }
    clearResults();

    $.get('http://localhost:3000/lookup', { upc: upc }, function (data) {
        generateItemCard(data.items[0]);
    });

}


//==========#Step 4 Declare Functions to generate card#==========//

function generateItemCard(item) {
    const $card = $(`
      <div class="item-card card" style="width: 24rem;">
          <img src="${item.images[0] || ''}" class="card-img-top" alt="Item Image">
          <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.description || 'No description available.'}</p>
              <p><strong>Brand:</strong> ${item.brand || 'Unknown'}</p>
              <p><strong>Category:</strong> ${item.category || 'N/A'}</p>
              <a href="${item.offers && item.offers[0]?.link}" target="_blank" class="btn btn-primary">View Product</a>
          </div>
      </div>
  `);

    $results.append($card);
}


//==========#Clears prior card so only one displays as a time#==========//
function clearResults(){
    $('#results').empty();
}
