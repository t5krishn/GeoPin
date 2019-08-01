// Function runs on edit page load - driver code
$(() => {
  if ($(".edit-container")) {
    const mapID = $("#map").data().id;

    // Listens for user to submit a query
    $("#search-form").on("submit", () => {
      event.preventDefault();
      const input = $("#search-map-input").val();
      $("#search-map-input").val("");
      searchMap(input);
    })

    // Edit button event listener
    $("#all-pins").on("submit", ".edit-form", (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("action");
      ajaxGetSinglePin(url)
      .done((pin) => {

        closeInfoWindowIfPresent();

      pin.geometry = { location: new google.maps.LatLng(pin.latitude, pin.longitude) };
      removeAllMarkers(allMarkers);
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
  }
});
