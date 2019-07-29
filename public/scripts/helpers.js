// Extract a parameter from given url as a string
const getMapIDFromURL = (url) => {
  const urlArray = url.split("/");
  const mapsIndex = urlArray.indexOf("maps");
  if (mapsIndex !== -1) {
    return urlArray[mapsIndex + 1];
  }
  return null;
};
