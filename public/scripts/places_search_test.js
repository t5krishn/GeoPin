let map;
let infowindow;
let service;

function placeSearchInit() {
    let toronto = new google.maps.LatLng(43.653225, -79.383186);
  
    infowindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(document.getElementById('map'), {center: toronto, zoom: 14});
    
    map.addListener('click', event => {
        console.log(event.latLng.lat(), event.latLng.lng());
    });

    let request = {
      query: 'sushi',
      fields: ['name', 'place_id', 'types', 'geometry']
    };
  
    let service = new google.maps.places.PlacesService(map);
  
    // service.findPlaceFromQuery(request, function(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //         console.log(results[i].name);
    //         //   createMarker(results[i]);
    //     }
    //     // map.setCenter(results[0].geometry.location);
    //     // console.log(results);
    //   }
    // });

    service.textSearch({
        query: 'sushi in toronto'},
        function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                    createMarker(results[i]);
                }
                map.setCenter(results[0].geometry.location);
                console.log(results.length);
            }
        }
    );

  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }