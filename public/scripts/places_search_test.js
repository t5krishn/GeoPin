// import { on } from "cluster";

let map;
let infowindow;
let service;
let allMarkers = [];
let lastOpenedInfoWindow;

// Listens for user to submit a query
$("#search-map-btn").on("click", () => {
  const input = $("#search-map-input").val();
  $("#search-map-input").val("");
  searchMap(input);
})

// function takes a query and returns the results and sets markers on map
function searchMap(input) {
  let service = new google.maps.places.PlacesService(map);

  // Clear current results & markers:
  $("#search-results-container").html("");
  removeAllMarkers();

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
        const lat = $(event.target).parent()[0].dataset.lat;
        const lng = $(event.target).parent()[0].dataset.lng;
        const center = new google.maps.LatLng(lat, lng);
        map.setCenter(center);
        map.setZoom(18);
      })

  });
}

function appendResults(place) {

  // latitude and longitude are stored as data attribute in the div container
  let result = `
  <div class="search-result" data-lat="${place.geometry.location.lat()}" data-lng="${place.geometry.location.lng()}">
    <h6>Name: ${place.name}</h6>
    <h6>Address: ${place.formatted_address}</h6>
    <h6>Type: ${snakeToString(place.types)}</h6>
  `;
  // For places that don't have a rating
  if (place.rating) {
    result += `<h6>Rating: ${place.rating}</h6>`;
  }
  // For places that don't have a photo
  if (place.photos) {
    $("#search-results-container").append(`<img class="search-result-img" src="${place.photos[0].getUrl({"maxWidth": 100, "maxHeight": 100})}">`);
  }
  result += `
    </div>
  `;

  $("#search-results-container").append(result);

}

function createMarker(place) {
  console.log(place.geometry.location);
  var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
        });

  allMarkers.push(marker);

  marker.addListener('click', function() {
    if (infowindow) {
      $(document).on("submit", "#pin-create-form", submitPinForm).off();
      infowindow.setContent("");
      infowindow.close();
    }
    infowindow = genInfoWindow(place, null);
    infowindow.open(map, marker);
  });

};

function genInfoWindow(place, editParams) {
  if (!editParams) {
    editParams = {
      label: "",
      description: "",
      pin_thumbnail_url: "",
      mapID: $("#map").data().id,
      putURL: ""
    };
  }
  console.log();

  const contentString = generateCreatePinFormContent(place, editParams.mapID);

  var infowindow = new google.maps.InfoWindow({ content: contentString });

  google.maps.event.addListener(infowindow, 'domready', function() {
    // Bind the create pin event listener
    $(document).on("submit", "#pin-create-form", submitPinForm);
  });

  return infowindow;

}

function removeAllMarkers() {
  for (let i = 0; i < allMarkers.length; i ++) {
    allMarkers[i].setMap(null);
  }
}

function initMap() {
  const city = document.querySelector('#map').dataset.city;
  let request = {
    query: city,
    fields: ['name', 'place_id', 'types', 'geometry']
  };

  let service = new google.maps.places.PlacesService(document.createElement('div'));

  service.findPlaceFromQuery(request, function(results, status) {
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
  })
}
