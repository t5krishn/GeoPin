// Add html for single pin container element
const createPinHTML = (pin, allPinsHTML) => {
  return `
    <div class="form-row">
      <p>This is my map id: <%= map_id %></p>
      <span>
        <form class="edit-form" action="/users/:owner_id/maps/:map_id/pins/:pin_id/edit/?_method=PUT" method="POST">
          <button class="edit-pin-btn pin-btn" type="button"><i class="fas fa-edit"></i></button>
        </form>
        <form class="delete-form" action="/users/:owner_id/maps/:map_id/pins/:pin_id/delete/?_method=DELETE" method="POST">
          <button class="delete-pin-btn pin-btn" type="button"><i class="fas fa-minus-circle"></i></button>
        </form>
      </span>
    </div> <!-- single pin row -->
  `
};

// Clear all HTML from given elementID
const clearPins = (elementID) => {
  $(elementID).empty();
};

// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Pins to given element
const addPinsToContainer = (pins, elementID) => {
  let allPinsHTML = ``;
  clearPins(elementID);
  for (const pin of pins) {
    allPinsHTML += createPinHTML(pin, allPinsHTML);
  }
  console.log('element; ', elementID);
  console.log(allPinsHTML);
  $(elementID).append(allPinsHTML);
};
