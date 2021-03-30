mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: team.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
}); 

map.addControl(new mapboxgl.NavigationControl());

const popup = new mapboxgl.Popup()
    .setHTML(
        `
        <div id="map-popup">
            <strong>${team.name}</strong>
            <p>${team.hqLocation}</p>
        </div>
        `
    );

const marker1 = new mapboxgl.Marker()
    .setLngLat(team.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);