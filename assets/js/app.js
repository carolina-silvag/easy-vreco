var map;
var infowindow;
var positionMap;
var div_map = 'map';

/* inicializando mapa*/
function initialize() {

  /*mapa por defecto al cargar*/
  let santiago = new google.maps.LatLng(-33.4691,-70.6420);
  map = new google.maps.Map(document.getElementById(div_map), {
    center: santiago,
    zoom: 18,
    animation: google.maps.Animation.DROP
  });

  /*autocompletado*/
  var input1 = document.getElementById('inputSearchInicio');
  autocomplete = new google.maps.places.Autocomplete(input1);

  var input2 = document.getElementById('inputSearchFinal');
  autocomplete = new google.maps.places.Autocomplete(input2);

  /*llamar a las funciones buscar y trazarRuta*/
  document.getElementById('btnSearch').addEventListener('click', search);
  document.getElementById('btnTrazar').addEventListener('click', trazarRuta);

  function search() {
    infowindow = new google.maps.InfoWindow();

    /*mi localizacion*/
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
    
        positionMap = pos;

        infowindow.setPosition(pos);
        infowindow.setContent('Location found.');
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



}

function createMarker(positionMap, map) {
  let marker = new google.maps.Marker({
    map: map,
    position: positionMap,
  });
}

function trazarRuta() {

  let request = {
    origin: $('#inputSearchInicio').val(),
    destination: $('#inputSearchFinal').val(),
    travelMode: google.maps.DirectionsTravelMode['DRIVING'],
    unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
    provideRouteAlternatives: false
  };

  map = new google.maps.Map($('#'+div_map).get(0));
  infowindow.setPosition(positionMap);
  infowindow.setContent('Location found.');
  map.setCenter(positionMap);
  createMarker(positionMap, map);
  // render traduce y service obtine
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  console.log();

  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);
    } else {
      alert("RUTA NO ENCONTRADA");
      document.getElementById("map").innerHTML = "<p style='text-align: center;'>Address not found</p>";      //delete content
    }
  });
}

