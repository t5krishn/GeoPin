// Add html for single pin container element
const createPinHTML = (pin, mapID) => {
  return `
    <div class="form-row">
      <p>This is my pin: ${pin.id}</p>
      <span>
        <form class="edit-form" action="/maps/:${mapID}/pins/${pin.id}/edit/?_method=PUT" method="POST">
          <button class="edit-pin-btn pin-btn" type="button"><i class="fas fa-edit"></i></button>
        </form>
        <form class="delete-form" action="/maps/${mapID}/pins/${pin.id}/delete/?_method=DELETE" method="POST">
          <button class="delete-pin-btn pin-btn" type="button"><i class="fas fa-minus-circle"></i></button>
        </form>
      </span>
    </div> <!-- single pin row -->
  `
};

// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Pins to given element
const addPinsToContainer = (pins, elementID, mapID) => {
  let allPinsHTML = ``;
  clearContainer(elementID);
  for (const pin of pins) {
    allPinsHTML += createPinHTML(pin, mapID);
  }
  $(elementID).append(allPinsHTML);
};
