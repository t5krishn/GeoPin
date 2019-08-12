// Function runs on edit page load - driver code
$(() => {
  // For small screens, enable toggle of individual menus on click

  if($(window).width() <= 750 ){
    const toggleForContainer = (idString, collapseString, $containerClicked) => {
      if ($containerClicked.attr("id") === idString && $($containerClicked)) {
        hideElement($(`#${idString}`));
      }
      showElement($(collapseString), "12.5%");
    };

    $(".edit-container").on('click', (event) => {
      event.stopPropagation();
      const $containerClicked = $(event.target.closest(".edit-container"));

      toggleForContainer("about-map-container", "#about-map-container-cl", $containerClicked);
      toggleForContainer("pin-container", "#pin-container-cl", $containerClicked);
      toggleForContainer("search-container", "#search-container-cl", $containerClicked);
      toggleForContainer("search-results-container", "#search-results-container-cl", $containerClicked);
    });



    const toggleCollapseButton = (collapseIdString, containerString, $containerClicked) => {

      if ($containerClicked.attr("id") === collapseIdString) {

        hideElement($(`#${collapseIdString}`));
        showElement($(containerString), "40%");
      } else {
        showElement($(`#${collapseIdString}`), "12.5%");
        hideElement($(containerString));
      }
    };

    $(".side-bar-collapse, .side-bar-collapse p").on('click', (event) => {
      event.stopPropagation();
      const $collapseButton = $(event.target).closest(".side-bar-collapse");
      toggleCollapseButton("about-map-container-cl", "#about-map-container", $collapseButton);
      toggleCollapseButton("pin-container-cl", "#pin-container", $collapseButton);
      toggleCollapseButton("search-container-cl", "#search-container", $collapseButton);
      toggleCollapseButton("search-results-container-cl", "#search-results-container", $collapseButton);
    });
  }



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
