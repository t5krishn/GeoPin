// Function runs on edit page load - driver code
$(() => {

  const toggleForContainer = ($element, idString, direction, collapseString, $container, offScreenValue) => {
    if ($($container).attr("id") === idString) {
      $element.css(direction, 0);
    } else {
      $element.css(direction, offScreenValue);
      $(collapseString).css(direction, 0);
    }
  };

  $(".side-bar-collapse").on('click', (event) => {
    const $container = $(event.target.closest(".edit-container"));
    const $aboutMapContainer = $("#about-map-container-cl");
    const $pinContainer = $("#pin-container-cl");
    const $searchContainer = $("#search-container-cl");
    const $searchResultsContainer = $("#search-results-container-cl");

    toggleForContainer($aboutMapContainer, "about-map-container-cl", "right", "#about-map-container", $container, "-800px");
    toggleForContainer($pinContainer, "pin-container-cl", "right", "#pin-container", $container, "-800px");
    toggleForContainer($searchContainer, "search-container-cl", "left", "#search-container", $container, "-800px");
    toggleForContainer($searchResultsContainer, "search-results-container-cl", "left", "#search-results-container", $container, "-800px");
  });

  $(".edit-container").on('click', (event) => {
    const $container = $(event.target.closest(".edit-container"));
    const $aboutMapContainer = $("#about-map-container");
    const $pinContainer = $("#pin-container");
    const $searchContainer = $("#search-container");
    const $searchResultsContainer = $("#search-results-container");

    toggleForContainer($aboutMapContainer, "about-map-container", "right", "#about-map-container-cl", $container, "-800px");
    toggleForContainer($pinContainer, "pin-container", "right", "#pin-container-cl", $container, "-800px");
    toggleForContainer($searchContainer, "search-container", "left", "#search-container-cl", $container, "-800px");
    toggleForContainer($searchResultsContainer, "search-results-container", "left", "#search-results-container-cl", $container, "-800px");
  });

  const focusOnCreatedPin = (pin, openInfoWindowNow) => {
    closeInfoWindowIfPresent();

    removeAllMarkers(allMarkers);

    // Open infowindow for newly created marker
    pin.openInfoWindowNow = openInfoWindowNow;
    pin.geometry = { location: new google.maps.LatLng(pin.latitude, pin.longitude) };
    createMarker(pin, pin);


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

        focusOnCreatedPin(pin, true);

      });
    });

    // Delete button event listener
    $("#all-pins").on("submit", ".delete-form", (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("action");
      ajaxDeletePin(url)
      .done(() => {
        const pinRow = event.target.closest(".pin-row");
        event.target.closest("#all-pins").removeChild(pinRow)
        closeInfoWindowIfPresent();
      });
    });
  }
});
