// Function runs on edit page load - driver code
$(() => {
  const mapID = $("#map").data().id;

  // Edit button event listener
  $("#all-pins").on("submit", ".edit-form", (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("action");
    ajaxGetSinglePin(url)
    .done((pin) => {

      closeInfoWindowIfPresent();

      pin.geometry = { location: new google.maps.LatLng(pin.latitude, pin.longitude) };
      removeAllMarkers();
      createMarker(pin, pin);


      map.setCenter(pin.geometry.location);


    });
  });

  // Delete button event listener
  $("#all-pins").on("submit", ".delete-form", (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("action");
    ajaxDeletePin(url)
    .done(() => {
      const formRow = event.target.closest(".form-row");
      event.target.closest("#all-pins").removeChild(formRow)
      closeInfoWindowIfPresent();
    });
  });

  // Call get all pins function to show
  ajaxGetAllPins(mapID)
  .done((pins) => {
    addPinsToContainer(pins, "#all-pins", mapID);
  });

});
