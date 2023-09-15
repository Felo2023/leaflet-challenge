//Read data
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(url).then(function(earthquake)
{
createMarker(earthquake.features)
});

// Create a map object.
let myMap = L.map("map", {
  center: [29.7604, -95.3698],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Define a createMarker() function 
function createMarker(earthquakeFeatures) {
  console.log(earthquakeFeatures);

for (i=0;i<earthquakeFeatures.length;i++){

  let location = earthquakeFeatures[i].geometry.coordinates;
  let magnitude = earthquakeFeatures[i].properties.mag * 5000;
  L.circle([location[1],location[0]], {
    fillOpacity: 0.75,
    color: markerColor(location[2]),
    fillColor: markerColor(location[2]),
    // Setting our circle's radius to equal the output of our markerSize() function:
    // This will make our marker's size proportionate to its population.
    radius: magnitude
  }).bindPopup(`<h1>$</h1> <hr> <h3>Population: </h3>`).addTo(myMap);
};
}
// Define a markerSize() function that will give each earthquake size and depth
function markerColor(depth) {
  if (depth < 15) return "#04FC14";
  else if (depth < 30) return "#B7FC04";
  else if (depth < 45) return "#EEFC04";
  else if (depth < 60) return "#FCB304";
  else if (depth < 75) return "#FC8504";
  else return "#FC0904"
};




