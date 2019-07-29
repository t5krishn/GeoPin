// File contains ajax functions for any and all pins

// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllPins = () => {
  $.ajax('/pinss', { method: 'GET' })
  .done(function(pins) {
    addPinsToContainer(pins, "#pin-container");
  })
  .fail(function(error) {
    console.log("oops");
    console.log(error);
  });
};


// Ajax for creating pin (adding to pin sidebar)
$("#pin-submit").on("submit", () => {
  event.preventDefault();
  $.ajax({
    url: "/maps/:mapid/pins",
    type: "POST",
    data: $form.serialize()
  })
  // scripts has function that reloads pins sidebar, currently call that loadPins()
  .then((pin) => {
    loadPins(pin.map_id);
  })
})

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
