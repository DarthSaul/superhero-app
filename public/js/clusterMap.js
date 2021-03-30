mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'cluster-map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-95.7129, 40.0902], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    
    map.addSource('teams', {
        type: 'geojson',
        data: teams,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'teams',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#F4A261', // Color for less than 10 in cluster
                10,
                '#E9C46A', // Color for 10-50 in cluster
                50,
                '#2A9D8F' // Color for greater than 50 in cluster
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20, // Size for less than 10 in cluster
                10, 
                25, // Size for 10-50 in cluster
                50,
                30 // Size for greater than 50 in cluster
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'teams',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.loadImage(
        'https://res.cloudinary.com/darthsaul/image/upload/w_100/v1617132410/Marvel-Ultimate-Team/superhero_1_g0bgco.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);
        }
    );

    map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'teams',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'custom-marker',
            'icon-size': 0.5
        }
    });

    map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('teams').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('click', 'unclustered-point', function (e) {
        const { popup } = e.features[0].properties
        const coordinates = e.features[0].geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({ offset: 25 })
            .setLngLat(coordinates)
            .setHTML(popup)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
    
    map.on('mousemove', 'unclustered-point', function (e) {
        map.getCanvas().style.cursor = 'pointer';
    })
    map.on('mouseleave', 'unclustered-point', function (e) {
        map.getCanvas().style.cursor = '';
    })
});