
function initMap() {
  let myLatLng = {lat: -25.363, lng: 131.044};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  let marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    draggable: true,
    title: 'Hello World!',
    animation: google.maps.Animation.DROP,
    label: 'hahahahhahaha',
    icon: ''
  });

  map.addListener('click' , function(event) {
    console.log(map);
    console.log(event.latLng.lat());
  });
}
