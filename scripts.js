
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbDl5d3h6NzkwOTdoM29xb20xYzJ3NmZsIn0.sMhj9jD84igqnZdX08l33A'
const map = new mapboxgl.Map({
projection: 'globe', //globe projection rather than the default web mercator
container: 'map', // container ID
style: 'mapbox://styles/daeleng/clai0pzys000015s2otsvi46f', // style URL
center: [-103.2502, 29.2498], // starting position [lng, lat]
zoom: 9.2, // starting zoom
pitch: 45, // get a good pitch that gets the mountains
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
   //this is where the pop up is created
   map.on('click','trails-layer', (e) => {
     // found this here: https://maplibre.org/maplibre-gl-js-docs/example/mouse-position/ to get coordinates on click
     const coordinates = e.lngLat.wrap();
     const name = e.features[0].properties.TRLNAME;
     const clas = e.features[0].properties.TRLCLASS;
     const length = e.features[0].properties.Miles;
     const length2 = length.toFixed(2);
     // this console was to test to see if the event (e) was working
     // console.log(length2);

     // this was in the example code im still not sure what it does and if its needed
     // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
     //    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
     //    }

     // this creates the pop up isteald and puts in the coordinates from above as well as properties from the 'trail-layer' to the pop up
     const popup = new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML('Name: ' + name + '<br>' + clas + '<br>' + 'Length: ' + length2 + 'mi')
      .addTo(map);
   });
   map.on('mouseenter', 'trails-layer', () => {
     map.getCanvas().style.cursor = 'pointer';
   });
   map.on('mouseleave', 'trails-layer', () => {
     map.getCanvas().style.cursor = '';
   });
});
// this code adds terrain and exagerates it to 1.5x, also adds in atmosphere
map.on('load', function () {
   map.addSource('mapbox-dem', {
       "type": "raster-dem",
       "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
       'tileSize': 512,
       'maxzoom': 14
   });
    map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.5});
    map.setFog({
      'range': [-1, 2],
      'horizon-blend': 0.3,
      'color': 'white',
      'high-color': '#add8e6',
      'space-color': '#d8f2ff',
      'star-intensity': 0.0
    });
});
// this code adds navegation controls
const navControl = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map.addControl(navControl, 'bottom-left');
// This will add scale control to the mapbox
const scaleControl = new mapboxgl.ScaleControl({
  unit: 'imperial'
});
map.addControl(scaleControl, 'bottom-right')
