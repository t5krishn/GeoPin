// Extract a parameter from given url as a string
const getMapIDFromURL = (url) => {
  const urlArray = url.split("/");
  const mapsIndex = urlArray.indexOf("maps");
  if (mapsIndex !== -1) {
    return urlArray[mapsIndex + 1];
  }
  return null;
};

// Clear all HTML from given elementID
const clearCrontainer = (elementID) => {
  $(elementID).empty();
};

// Function to close infowindow after submitting a pin edit or create form
const closePinFormWindow = function() {
  $(document).on("submit", "#pin-create-form", submitPinForm).off();
  infowindow.setContent("");
  infowindow.close();
}

// Function to check if an infowindow is present and delete if so
const closeInfoWindowIfPresent = function() {
  // Close infowindow on page if open
  if (infowindow) {
    $(document).on("submit", "#pin-create-form", submitPinForm).off();

    infowindow.setContent("");
    infowindow.close();
  }
}

// Function to loop through all markers on map and delete them
function removeAllMarkers(array) {
  for (let i = 0; i < array.length; i ++) {
    array[i].setMap(null);
  }
}

// Convert snake case string
function snakeToString(array) {
  let sentence = "";
  for (let i = 0; i < array.length; i ++) {
    let string = "";

    for (let char of array[i]) {
      if (char === "_") {
        string += " ";
      } else {
        string += char;
      }
    }

    sentence += string;

    if (i !== array.length - 1) {
      sentence += ", ";
    }
  }
  return sentence;
}

// Jquery to animate and hide an element (used on maps_edit)
const hideElement = ($element) => {
  if($element.css("visibility") === "visible") {
    $element.animate({width: "0"}, 300,() => {
      $element.css("visibility", "hidden");
    });
  }
}

// Jquery to animate and show an element (used on maps_edit)
const showElement = ($element, width) => {

  if($element.css("visibility") === "hidden") {
    $element.css("visibility", "visible");
    $element.animate({width}, 300);
  }
}

// Jquery add event listeners to maps edit and side bar buttons for responsive toggle on click
const addResponsiveListeners = () => {

  $(".edit-container form").on("click", (event) => {
    event.stopPropagation();
  });

  const toggleForContainer = (idString, collapseString, $containerClicked) => {
    if ($containerClicked.attr("id") === idString && $($containerClicked)) {
      hideElement($(`#${idString}`));
    }
    showElement($(collapseString), "12.5%");
  };

  $(".edit-container").on('click', (event) => {
    event.stopPropagation();

    if(window.matchMedia("screen and ( max-height: 1000px), (max-width: 750px)").matches){
      const $containerClicked = $(event.target.closest(".edit-container"));

      toggleForContainer("about-map-container", "#about-map-container-cl", $containerClicked);
      toggleForContainer("pin-container", "#pin-container-cl", $containerClicked);
      toggleForContainer("search-container", "#search-container-cl", $containerClicked);
      toggleForContainer("search-results-container", "#search-results-container-cl", $containerClicked);
    }
  });

  const toggleCollapseButton = (collapseIdString, containerString, $containerClicked) => {
    if ($containerClicked.attr("id") === collapseIdString) {
      hideElement($(`#${collapseIdString}`));
      showElement($(containerString), "50%");
    } else {
      showElement($(`#${collapseIdString}`), "12.5%");
      hideElement($(containerString));
    }
  };

  $(".side-bar-collapse, .side-bar-collapse p").on('click', (event) => {
    if(window.matchMedia("screen and ( max-height: 1000px), (max-width: 750px)").matches){
      event.stopPropagation();
      const $collapseButton = $(event.target).closest(".side-bar-collapse");
      toggleCollapseButton("about-map-container-cl", "#about-map-container", $collapseButton);
      toggleCollapseButton("pin-container-cl", "#pin-container", $collapseButton);
      toggleCollapseButton("search-container-cl", "#search-container", $collapseButton);
      toggleCollapseButton("search-results-container-cl", "#search-results-container", $collapseButton);
    }
  });
};
