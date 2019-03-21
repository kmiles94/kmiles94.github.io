var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.dark',
      accessToken: 'pk.eyJ1Ijoia21pbGVzOTQiLCJhIjoiY2pvNTdoa2dyMDcyMTNrczExNTluc2liNCJ9.sdcjzY6RyrNg2roubvrFSw',
    }).addTo(map);


var control = L.Routing.control({
    waypoints: [
        null
    ],
    routeWhileDragging: true,
    units: 'imperial',
    //router: L.Routing.Mapbox('pk.eyJ1Ijoia21pbGVzOTQiLCJhIjoiY2pvNTdoa2dyMDcyMTNrczExNTluc2liNCJ9.sdcjzY6RyrNg2roubvrFSw')
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map); 

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

 map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startbtn = createButton('Start', container),
        destbtn = createButton('Destination', container);

    L.DomEvent.on(startbtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });

    L.DomEvent.on(destbtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
    });

