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
  $(".search-result").remove();
  removeAllMarkers(allMarkers);

  service.textSearch({
    // pass in input from user + city (map_id)
    query: input,
    location: map.getCenter()
   },
    function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
              console.log(results[i]);
              appendResults(results[i]);
              createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
      }

      // When a search result is clicked, the map should center to that marker
      $(".search-result").bind("click", (event) => {
        const lat = $(event.target).closest($(".search-result")).data().lat;
        const lng = $(event.target).closest($(".search-result")).data().lng;
        const center = new google.maps.LatLng(lat, lng);
        createMarker({geometry: {location: center}});
        map.setCenter(center);
        map.setZoom(18);
      })

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

  $("#search-results-container").append(result);

}

function createMarker(place, createEditInfowindow) {

  var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map
        });

  allMarkers.push(marker);

  if (createEditInfowindow) {
    const editParams = {
      action: "Edit",
      label: place.label,
      description: place.description,
      pin_thumbnail_url: place.pin_thumbnail_url,
      mapID: place.map_id,
      url: `/maps/${place.map_id}/pins/${place.id}/edit/?_method=PUT`,
      newPinCallback: null
    };

    infowindow = genInfoWindow(place, editParams, marker);
    infowindow.open(map, marker);

  } else {

    marker.addListener('click', function() {
      if (infowindow) {
        closePinFormWindow();
      }

      let editParams = {
        label: "",
        description: "",
        pin_thumbnail_url: "",
        mapID: $("#map").data().id,
        url: `/maps/${$("#map").data().id}/pins`,
        newPinCallback: addPinsToContainer
      };

      infowindow = genInfoWindow(place, editParams, marker);
      infowindow.open(map, marker);
    });
  }

};

function genInfoWindow(place, editParams, marker) {
  const contentString = generatePinFormContent(place, editParams);

  var infowindow = new google.maps.InfoWindow({ position: marker.position, content: contentString });

  google.maps.event.addListener(infowindow, 'domready', function() {
    // Bind the create pin event listener
    $(document).on("submit", "#pin-create-form", submitPinForm(editParams.newPinCallback));
  });

  return infowindow;

}

async function initMap() {
  const mapID = $("#map").data().id;

  const city = document.querySelector('#map').dataset.city;
  let request = {
    query: city,
    fields: ['name', 'place_id', 'types', 'geometry']
  };

  let service = new google.maps.places.PlacesService(document.createElement('div'));

  await service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      // ADD LAT LNG TO MAP DATABASE
      let center = new google.maps.LatLng(lat, lng);
      map = new google.maps.Map(document.getElementById('map'), {center: center, zoom: 14});
      map.addListener('click', event => {
        console.log(event.latLng.lat(),  event.latLng.lng());
      });
    }

    // Call get all pins function to show
    ajaxGetAllPins(mapID)
    .done((pins) => {
      addPinsToContainer(pins, "#all-pins", mapID);
    });

  })

}
