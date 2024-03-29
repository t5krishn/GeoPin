// Function runs on edit page load - driver code
$(() => {
  addResponsiveListeners();

  $(window).resize(function(){
    if(!window.matchMedia("screen and ( max-height: 1000px), (max-width: 750px)").matches){
      hideElement($(".side-bar-collapse"))
      showElement($(".edit-container"), "25%");
    }
  });

  const focusOnCreatedPin = (pin, openInfoWindowNow) => {
    closeInfoWindowIfPresent();

    removeAllMarkers(allMarkers);

    // Open infowindow for newly created marker
    pin.openInfoWindowNow = openInfoWindowNow;
    pin.geometry = { location: new google.maps.LatLng(pin.latitude, pin.longitude) };
    createMarker(pin, true);

    map.setCenter(pin.geometry.location);
  }


// Your pin event listener to recenter on and create pin for click
    // Edit button event listener
    $("#all-pins").on("click", ".pin-row", (event) => {
      if(!$(event.target).closest("form").html()) {
        const mapID = $("#map").data().id;
        const pinID = $(event.target).closest(".pin-row").data().pin_id;
        const url = `/maps/${mapID}/pins/${pinID}/`;
        ajaxGetSinglePin(url)
        .done((pin) => {

          focusOnCreatedPin(pin, false);

        });
      }
    });

  if ($("body").data().user_id) {
    // Listens for user to submit a query
    $("#search-form").on("submit", () => {
      event.preventDefault();
      const input = $("#search-map-input").val();
      $("#search-map-input").val("");
      searchMap(input);
    });

    // Edit button event listener
    $("#all-pins").on("submit", ".edit-form", (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("action");
      ajaxGetSinglePin(url)
      .done((pin) => {

        closeInfoWindowIfPresent();

        removeAllMarkers(allMarkers);

        // Open infowindow for newly created marker
        pin.openInfoWindowNow = true;
        pin.geometry = { location: new google.maps.LatLng(pin.latitude, pin.longitude) };
        pin.isUserPin = true;
        createMarker(pin, true);


        map.setCenter(pin.geometry.location);
        focusOnCreatedPin(pin, true);

      });
    });

    // Delete button event listener
    $("#all-pins").on("submit", ".delete-form", (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("action");
      ajaxDeletePin(url)
      .done(data => {
        removeMarker(data.pin);
        const pinRow = event.target.closest(".pin-row");
        event.target.closest("#all-pins").removeChild(pinRow)
        closeInfoWindowIfPresent();
      });
    });
  }
});
