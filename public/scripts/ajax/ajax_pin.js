// File contains ajax functions for any and all pins

// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllPins = (mapID) => {
  return $.ajax(`/maps/${mapID}/pins`, { method: 'GET' })
  .done(function(pins) {
    if (pins) {
      return pins;
    }
    return null;
  });
};

// AJAX Request for getting pin information to populate form
const ajaxGetSinglePin = (url) => {
  return $.ajax(url, { method: 'GET' })
  .done(function(pin) {
    if (pin) {
      return pin;
    }
    return null;
  });
};

// AJAX Request for getting pin information to populate form
const ajaxDeletePin = (url) => {
  return $.ajax(url, { method: 'POST' })
  .done(function(response) {
    return response.pin;
  });
};

// Submit pin create form
const submitPinForm = (newPinCallback) => {
  return (event) => {
    event.preventDefault();
    $form = $("#pin-create-form");
    $.ajax({
      url: $("#pin-create-form").attr("action"),
      type: "POST",
      data: $form.serialize()
    })
    .done((pin) => {
      if(newPinCallback) {
        newPinCallback([pin], $("#all-pins"), true);
      }
      closePinFormWindow();
    })
  }
}

/* ************** FUNCTIONS WE NEED TO CREATE ******************** */
// createPin() function creates div element which has pin information and an edit, and delete pin
// loadPins() function refreshes side bar and requires map_id param it uses a loop that calls on createPin() function, appends
// createInfoWindow() function takes an argument, if null creates a create form for that marker
