// Function runs on edit page load - driver code
$(() => {
  const mapID = $("#map").data().id;

  // Edit button event listener
  $("#all-pins").on("submit", ".edit-form", (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("action");
    ajaxGetSinglePin(url)
    .done((pin) => {
      pin.geometry = { location: new google.maps.LatLng(pin.latitude, pin.longitude) };
      removeAllMarkers();
      createMarker(pin)

      if (infowindow) {
        $(document).on("submit", "#pin-create-form", submitPinForm).off();

        infowindow.setContent("");
        infowindow.close();
      }

      const editParams = {
        label: pin.label,
        description: pin.description,
        pin_thumbnail_url: pin.pin_thumbnail_url,
        mapID: pin.map_id,
        url: `/maps/${pin.map_id}/pins/${pin.id}/edit/?_method=PUT`
      };

      infowindow = genInfoWindow(pin, editParams);
      infowindow.open(map, allMarkers[0]);
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
    });
  });

  // Call get all pins function to show
  ajaxGetAllPins(mapID)
  .done((pins) => {
    addPinsToContainer(pins, "#all-pins", mapID);
  });

});
