var map;
var infowindow;
var positionMap;
var div_map = 'map';

/* inicializando mapa*/
var o = document.getElementById('inputSearchInicio').value;
var d = document.getElementById('inputSearchFinal').value;
var s = document.getElementById('btnTrazar').value;
function initMap() {
  let santiago = new google.maps.LatLng(-33.4691,-70.6420);

  map = new google.maps.Map(document.getElementById(div_map), {
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
  document.getElementById('btnTrazar').addEventListener('click', trazarRuta);

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
        alert('no te encuentro');
        setDefaultMap(santiago);
      });
    } else {
      alert("No es posible utilizar geolocation");
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


}

function trazarRuta() {

  var request = {
        origin: $('#inputSearchInicio').val(),
        destination: $('#inputSearchFinal').val(),
        travelMode: google.maps.DirectionsTravelMode['DRIVING'],
        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false
    };

    // map = new google.maps.Map($('#'+div_map).get(0));
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setMap(map);
          directionsDisplay.setDirections(response);
        } else {
          alert("RUTA NO ENCONTRADA");
          // document.getElementById("map").innerHTML = "<p style='text-align: center;'>Address not found</p>";      //delete content
        }
    });
}

    // Call to google maps for search a route from 2 points
/*function initMap(o, d, s) {
    
}*/
