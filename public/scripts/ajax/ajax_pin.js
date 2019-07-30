// File contains ajax functions for any and all pins

// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllPins = (elementID, mapID) => {
  $.ajax(`/maps/${mapID}/pins`, { method: 'GET' })
  .done(function(pins) {
    if (pins) {
      addPinsToContainer(pins, elementID, mapID);
    }
  });
};

// Ajax for editing pin
// Do we even need to go to the GET route? Can we directly pull from the database in the jQuery event listener?
$("#edit-pin-btn").on("click", () => {
  event.preventDefault();
  const pinId = $(this).attr('name');
  $.ajax({
    url: "/maps/:mapid/pins/:pinid/edit", // reference form method later
    type: "GET",
    data: pinId
  })
  .then((pin) => {
    // After edit this pin is clicked, map recenters to that pin and an edit form pops up with prepopulated inputs

  })
})

/* ************** FUNCTIONS WE NEED TO CREATE ******************** */
// createPin() function creates div element which has pin information and an edit, and delete pin
// loadPins() function refreshes side bar and requires map_id param it uses a loop that calls on createPin() function, appends
// createInfoWindow() function takes an argument, if null creates a create form for that marker
