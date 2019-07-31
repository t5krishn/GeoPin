// Add html for single pin container element
const createPinHTML = (pin) => {
  return `
    <div class="form-row">
      <p>This is my pin: ${pin.id}</p>
      <span>
        <form class="edit-form" action="/maps/${pin.map_id}/pins/${pin.id}/" method="GET">
          <button class="edit-pin-btn pin-btn" type="submit"><i class="fas fa-edit"></i></button>
        </form>
        <form class="delete-form" action="/maps/${pin.map_id}/pins/${pin.id}/delete/?_method=DELETE" method="POST">
          <button class="delete-pin-btn pin-btn" type="submit"><i class="fas fa-minus-circle"></i></button>
        </form>
      </span>
    </div> <!-- single pin row -->
  `
};

const generatePinFormContent = function(place, editParams) {
  return `
      <form id="pin-create-form" action="${editParams.url}" method="POST">
      <div class="form-row">
        <label for="pin-label">Label:</label>
        <textarea class="form-input" type="text" id="pin-label" name="label" placeholder="Label your pin...">${editParams.label}</textarea>
      </div>
      <div class="form-row">
        <label for="pin-description">Description:</label>
        <textarea class="form-input" id="pin-description" name="description" placeholder="Describe your pin...">${editParams.description}</textarea>
      </div>
      <div class="form-row">
        <label for="pin-thumbnail">Thumbnail URL:</label>
        <textarea class="form-input" type="text" id="pin-thumbnail" name="pin_thumbnail_url" placeholder="Paste your image URL...">${editParams.pin_thumbnail_url}</textarea>
      </div>
      <input name="lat" type="hidden" for="pin-thumbnail" value="${place.geometry.location.lat()}">
      <input name="lng" type="hidden" for="pin-thumbnail" value="${place.geometry.location.lng()}">
      <button id="create-pin-btn" class="btn btn-primary" type="submit">Submit</button>
      </form>
  `;
}

// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Pins to given element
const addPinsToContainer = (pins, elementID) => {
  let allPinsHTML = ``;
  for (const pin of pins) {
    allPinsHTML += createPinHTML(pin);
  }
  $(elementID).append(allPinsHTML);

};
