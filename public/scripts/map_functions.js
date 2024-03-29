// import { on } from "cluster";

let map;
let infowindow;
let service;
let allMarkers = [];
let myMarkers = [];
let lastOpenedInfoWindow;

// function takes a query and returns the results and sets markers on map
function searchMap(input) {
  let service = new google.maps.places.PlacesService(map);

  // Clear current results & markers:
  $("#search-results-container").children(".search-result").remove();
  removeAllMarkers(allMarkers);

  service.textSearch({
    // pass in input from user + city (map_id)
    query: input,
    location: map.getCenter()
  },
    function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          results[i].isUserPin = false;
          appendResults(results[i]);
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }



    });
}

function appendResults(place) {

  // latitude and longitude are stored as data attribute in the div container
  let result = `
  <div class="row search-result container" data-lat="${place.geometry.location.lat()}" data-lng="${place.geometry.location.lng()}">
    <span class="result-details">
      <p>${place.name}</p>
      <p>${place.formatted_address}</p></span>
      `;
  // For places that don't have a rating
  // Temporarily removed extra info about place
  // <p>Type: ${snakeToString(place.types)}</p></span>
  // ${place.rating ? `<p>Rating: ${place.rating}</p>` : ``}</span>
  // For places that don't have a photo
  if (place.photos) {
    result += `<span class="result-image"><img class="search-result-img img-fluid" src="${place.photos[0].getUrl()}"></span>`;
  }
  result += `
    </div>
  `;
  // geometry: {location: center}
  $("#search-results-container").append(result);

  // When a search result is clicked, the map should center to that marker
  $("#search-results-container .search-result:last-of-type").bind("click", (event) => {
    const lat = $(event.target).closest($(".search-result")).data().lat;
    const lng = $(event.target).closest($(".search-result")).data().lng;
    const center = new google.maps.LatLng(lat, lng);
    place.isUserPin = false;
    createMarker(place);
    map.setCenter(center);
    map.setZoom(18);
  })

}

function createMarker(place, createEditInfowindow) {

  let markerStyle = null;
  let marker = null;
  // console.log(place.geometry.location.lat());
  if (place.isUserPin) {
    markerStyle = {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: 'gold',
      fillOpacity: 1,
      scale: 6,
      strokeColor: 'black',
      strokeWeight: 1.5,
      zIndex: 10
      // anchor: (place.geometry.location.lat(), place.geometry.location.lng())
    };
    marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      icon: markerStyle,
      animation: google.maps.Animation.DROP,
      pin_id: place.id,
      zIndex: 1
    });
    myMarkers.push(marker)
  } else {
    marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      icon: markerStyle,
      // animation: google.maps.Animation.DROP
    });
    allMarkers.push(marker);
  }
  let editParams = {};


  if (createEditInfowindow) {
    editParams = {
      action: "Edit",
      label: place.label,
      description: place.description,
      pin_thumbnail_url: place.pin_thumbnail_url,
      mapID: place.map_id,
      url: `/maps/${place.map_id}/pins/${place.id}/edit/?_method=PUT`,
      newPinCallback: null
    };

    if (place.openInfoWindowNow) {
      infowindow = genInfoWindow(place, editParams, marker);
      infowindow.open(map, marker);
    }
  } else {
    editParams = {
      action: "Create",
      label: place.name,
      description: "",
      pin_thumbnail_url: place.photos ? place.photos[0].getUrl() : "",
      mapID: $("#map").data().id,
      url: `/maps/${$("#map").data().id}/pins`,
      newPinCallback: addPinsToContainer
    };
  }
  if ($("body").data().user_id) {
    marker.addListener('click', function () {
      if (infowindow) {
        closePinFormWindow();
      }
      infowindow = genInfoWindow(place, editParams, marker);
      infowindow.open(map, marker);
    });
  }
};

function genInfoWindow(place, editParams, marker) {
  const contentString = generatePinFormContent(place, editParams);

  var infowindow = new google.maps.InfoWindow({ position: marker.position, content: contentString });

  google.maps.event.addListener(infowindow, 'domready', function () {
    // Bind the create pin event listener
    $(document).on("submit", "#pin-create-form", submitPinForm(editParams.newPinCallback));
  });

  return infowindow;

}

// Gets run on load of maps API script tag
async function initMap() {
  const mapID = $("#map").data().id;

  const city = document.querySelector('#map').dataset.city;
  let request = {
    query: city,
    fields: ['name', 'place_id', 'types', 'geometry']
  };

  let service = new google.maps.places.PlacesService(document.createElement('div'));

  await service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      // ADD LAT LNG TO MAP DATABASE
      let center = new google.maps.LatLng(lat, lng);
      map = new google.maps.Map(document.getElementById('map'), { center: center, zoom: 14 });
      map.addListener('click', event => {
        console.log(event.latLng.lat(), event.latLng.lng());
      });
    }

    // NOTE if we revisit for security, we need to place a query for user exists in DB
    // Call get all pins function to show
    ajaxGetAllPins(mapID)
      .done((pins) => {
        const userID = $("body").data().user_id;
        addPinsToContainer(pins, "#all-pins", userID);
      });

  })

}

// Loops through myMarkers and removes the marker that has the same pin_id as the pin's id 
// ADDED pin_id INTO MARKER, which is used to store the pin_id that can be used to delete
const removeMarker = pin => {
  for (let index = 0; index < myMarkers.length; index++) {
    if (pin.id === myMarkers[index].pin_id) {
      myMarkers[index].setMap(null);
      myMarkers.splice(index, 1);
    }
  }
};
