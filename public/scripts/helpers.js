// Extract a parameter from given url as a string
const getMapIDFromURL = (url) => {
  const urlArray = url.split("/");
  console.log("array: ", urlArray);
  const mapsIndex = urlArray.indexOf("maps");
  console.log("index: ", mapsIndex);
  if (mapsIndex !== -1) {
    return urlArray[mapsIndex + 1];
  }
  return null;
};
