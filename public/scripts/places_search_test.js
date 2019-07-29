// import { on } from "cluster";

let map;
let infowindow;
let service;
let allMarkers = [];

function placeSearchInit(arr) {
    let toronto = new google.maps.LatLng(43.653225, -79.383186);
    // let toronto = new google.maps.LatLng(arr[0], arr[1]);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {center: toronto, zoom: 14});

    map.addListener('click', event => {
        console.log(event.latLng.lat(), event.latLng.lng());
    });

    // let request = {
    //   query: 'sushi',
    //   fields: ['name', 'place_id', 'types', 'geometry']
    // };

    // service.findPlaceFromQuery(request, function(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //         console.log(results[i].name);
    //           createMarker(results[i]);
    //     }
    //     map.setCenter(results[0].geometry.location);
    //     console.log(results);
    //   }
    // });

  }

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
            for (var i = 0; i < 20; i++) {
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
          console.log(lat, lng);
        })

    });
  }

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

  function appendResults(place) {

    // latitude and longitude are stored as data attribute in the div container
    let result = `
    <div class="search-result" data-lat="${place.geometry.location.lat()}" data-lng= "${place.geometry.location.lng()}">
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
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    allMarkers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  function removeAllMarkers() {
    for (let i = 0; i < allMarkers.length; i ++) {
      allMarkers[i].setMap(null);
    }
  }
