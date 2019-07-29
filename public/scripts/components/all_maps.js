$(() => {
  // Add html for single map container element


  // Functions for appending/removing and adding elements from page
  const $allMaps = $("#browse-map-wrapper")

  let mapsToRender = ``;

  function addMap(map) {
    $allMaps.append(map);
  }
  function clearMaps() {
    $allMaps.empty();
  }

  function addMaps(maps, isReservation = false) {
    clearMaps();
    for (const mapID in maps) {
      const map = maps[mapID];
      const listing = createMap(map, isReservation);
      addMap(listing);
    }
  }

  function getAllMaps() {

  }

  $allMaps.append(mapsToRender);

});
