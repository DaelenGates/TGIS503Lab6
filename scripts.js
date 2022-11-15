
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbDl5d3h6NzkwOTdoM29xb20xYzJ3NmZsIn0.sMhj9jD84igqnZdX08l33A'
const map = new mapboxgl.Map({
projection: 'globe', //globe projection rather than the default web mercator
container: 'map', // container ID
style: 'mapbox://styles/daeleng/clai0pzys000015s2otsvi46f', // style URL
center: [-103.2502, 29.2498], // starting position [lng, lat]
zoom: 9, // starting zoom
//pitch: 85,
//bearing: 80,
});

map.on('load', () => {
  map.addSource('trails', {
     type: 'geojson',
     data: 'data/Big_Bend_Trails.geojson' // note, you'll have to change this if your data file is not in an enclosing folder named 'data'
 });

 map.addLayer({
   'id': 'trails-layer',
   'type': 'line',
   'source': 'trails',
   'paint': {
       'line-width': 3,
       'line-color': ['match', ['get', 'TRLCLASS'],
        'Class 1: Minimally Developed', 'red',
        'Class 2: Moderately Developed', 'orange',
        'Class 3: Developed', 'yellow',
        /*else,*/ 'blue'
       ]
   }
 });
 map.addSource('bounds', {
       type: 'geojson',
       data: 'data/BigBendBounds.geojson'// note again, you may need to change this.
   });

   map.addLayer({
     'id': 'boundary-layer',
     'type': 'line',
     'source': 'bounds',
     'paint': {
         'line-width': 4,
         'line-color': 'black',
         'line-opacity': .6
     }
   });
});
