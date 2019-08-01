// Add html for single pin container element
const createPinHTML = (pin, userIsLoggedIn) => {
  let rightSideSpanContent = ``;
  if (userIsLoggedIn) {
    rightSideSpanContent = `
      <span class="pin-btn-container>
        <form class="edit-form" action="/maps/${pin.map_id}/pins/${pin.id}/" method="GET">
          <button class="btn edit-pin-btn pin-btn" type="submit"><i class="fas fa-edit"></i></button>
        </form>
        <form class="delete-form" action="/maps/${pin.map_id}/pins/${pin.id}/delete/?_method=DELETE" method="POST">
          <button class="btn delete-pin-btn pin-btn" type="submit"><i class="fas fa-minus-circle"></i></button>
        </form>
      </span>
    `;
  } else {
    rightSideSpanContent = `
    <span class="result-image">
      <img class="search-result-img img-fluid" src="${pin.pin_thumbnail_url}">
    </span>
    `;
  }
  return `
    <div class="row search-result container pin-row" data-pin_id=${pin.id}>
      <span class="result-details">
        <p>${pin.label}</p>
        <p>${pin.description}</p>
      </span>${rightSideSpanContent}
    </div> <!-- single pin row -->
  `
};

const generatePinFormContent = function(place, editParams) {
  return `
      <form id="pin-create-form" class="form-group" action="${editParams.url}" method="POST">
        <h3>${editParams.action} your pin!</h3>
        <div class="form-group form-row form-inline">
          <label for="pin-label">Label:</label>
          <input class="form-control form-control-sm" type="text" id="pin-label" name="label" placeholder="Label your pin..." value="${editParams.label}"></input>
        </div>
        <div class="form-group form-row form-inline">
          <label for="pin-description">Description:</label>
          <textarea class="form-control form-control-sm" id="pin-description" name="description" placeholder="Describe your pin..." value="${editParams.description}"></textarea>
        </div>
        <div class="form-group form-row form-inline">
          <label for="pin-thumbnail">Thumbnail URL:</label>
          <input class="form-control form-control-sm" type="text" id="pin-thumbnail" name="pin_thumbnail_url" placeholder="Paste your image URL..." value="${editParams.pin_thumbnail_url}"></input>
        </div>
        <input name="lat" type="hidden" for="pin-thumbnail" value="${place.geometry.location.lat()}">
        <input name="lng" type="hidden" for="pin-thumbnail" value="${place.geometry.location.lng()}">
        <button id="create-pin-btn" class="btn btn-primary" type="submit">Submit</button>
      </form>
  `;
}

// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Pins to given element
const addPinsToContainer = (pins, elementID, userIsLoggedIn) => {
  let allPinsHTML = ``;
  for (const pin of pins) {
    pin.geometry = {location: new google.maps.LatLng(pin.latitude, pin.longitude)};
    pin.isUserPin = true;

    createMarker(pin, true);

    allPinsHTML += createPinHTML(pin, userIsLoggedIn);
  }
  $(elementID).append(allPinsHTML);
};
