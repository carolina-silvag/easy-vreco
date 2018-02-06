var map;
var infowindow;
var positionMap;

/* inicializando mapa*/
function initMap() {
  let santiago = new google.maps.LatLng(-33.4691,-70.6420);

  map = new google.maps.Map(document.getElementById('map'), {
    center: santiago,
    zoom: 18
  });

  /*if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
  
      positionMap = pos;

    
      map.setCenter(pos);
      createMarker(pos, map);
    }, function() {
      alert('no te encuientro');
      setDefaultMap(santiago);
    });
  } else {
    setDefaultMap(santiago);
  }*/

  document.getElementById('btnSearch').addEventListener('click', search);

  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
    
        positionMap = pos;

        /*infowindow.setPosition(pos);
        infowindow.setContent('Location found.');*/
        map.setCenter(pos);
        createMarker(pos, map);
      }, function() {
        alert('no te encuientro');
        setDefaultMap(santiago);
      });
    } else {
      setDefaultMap(santiago);
    }
  }

  function createMarker(pos, map) {
    console.log(pos);
    console.log(map);
    var marker = new google.maps.Marker({
      map: map,
      position: pos,
    });
  }

var directionsDisplay = null;
var directionsService = null;
var map = null
var request = {
        origin: [document.getElementById('inputSearchInicio')],
        destination: [document.getElementById('inputSearchFinal')],
        travelMode: google.maps.DirectionsTravelMode['DRIVING'],
        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false
    };

    console.log(request);
    // Call to google maps for search a route from 2 points
var o = document.getElementById('inputSearchInicio').value();
var d = document.getElementById('inputSearchFinal').value();
var s = document.getElementById('btnTrazar').value();
function initMap(o, d, s) {
    var request = {
        origin: o,
        destination: d,
        travelMode: google.maps.DirectionsTravelMode['DRIVING'],
        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false
    };

    map = new google.maps.Map($('#' + s).get(0));
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        } else {
            document.getElementById(s).innerHTML = "<p style='text-align: center;'>Address not found</p>";      //delete content
        }
    });
}

}
