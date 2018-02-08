
var map;
var infowindow;
var positionMap;
var santiago;
var div_map = 'map';

/* inicializando mapa*/
function initialize() {
  
  /* autocompletado*/
  const input1 = document.getElementById('inputSearchInicio');
  autocomplete = new google.maps.places.Autocomplete(input1);

  const input2 = document.getElementById('inputSearchFinal');
  autocomplete = new google.maps.places.Autocomplete(input2);

  /* mapa por defecto al cargar*/
  santiago = new google.maps.LatLng(-33.4691,-70.6420);
  map = new google.maps.Map(document.getElementById(div_map), {
    center: santiago,
    zoom: 15,
    mapTypeControl: false
  });

  infowindow = new google.maps.InfoWindow();

  /* llamar a las funciones buscar y trazarRuta*/
  $('#btnSearch').click(search);
  $('#btnSearch2').click(search);
  $('#btnTrazar').click(trazarRuta);

  typeMap();


}


function typeMap() {

  document.getElementById('content').innerHTML = '<div id="style-selector-control"  class="map-control"></div>';
  document.getElementById('style-selector-control').innerHTML = "<select id='style-selector' class='selector-control form-control'><option value='default'>Default</option><option value='silver'>Silver</option><option value='night'>Night mode</option><option value='retro' selected='selected'>Retro</option><option value='hiding'>Hide features</option></select>";
  // Agregue a style-selector control de mapa.
  var styleControl = document.getElementById('style-selector-control');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

  // Establecer el estilo del mapa en el valor inicial del selector.
  var styleSelector = document.getElementById('style-selector');
  map.setOptions({styles: styles[styleSelector.value]});

  // Aplicar uno nuevo cuando el usuario seleccione un estilo diferente.
  styleSelector.addEventListener('change', function() {
    map.setOptions({styles: styles[styleSelector.value]});
  });
}

function search() {
  /* mi localizacion*/
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      positionMap = pos;

      map = new google.maps.Map(document.getElementById(div_map), {
        center: positionMap,
        zoom: 15,
        mapTypeControl: false
      });
  
      typeMap();

      infowindow.setPosition(pos);
      createMarker(pos, map);
    }, function() {
      swal('No fue posible encontrar tu ubicacion', '','error');
    });
  } else {
    swal("No es posible utilizar geolocation", '', 'error');
  }
}

/*crear marker de mi posicion*/
function createMarker(positionMap, map) {

  let marker = new google.maps.Marker({
    map: map,
    position: positionMap,
    animation: google.maps.Animation.DROP
  });
}

/* crear marker personalizado de inico y fin recorrido bicicleta*/
function createMarkerBicycle(positionMap, map) {

  let marker = new google.maps.Marker({
    map: map,
    position: positionMap,
    icon: 'assets/images/markerBicycle.png',
    animation: google.maps.Animation.DROP
  });
}

/*trazar la ruta encontrada*/
function trazarRuta() {
  let request = {
    origin: $('#inputSearchInicio').val(),
    destination: $('#inputSearchFinal').val(),
    travelMode: google.maps.DirectionsTravelMode['DRIVING'],
    /*unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
    provideRouteAlternatives: false*/
  };

  map = new google.maps.Map($('#'+div_map).get(0), {
    center: santiago,
    zoom: 15,
    mapTypeControl: false
  });

  infowindow.setPosition(positionMap);
  map.setCenter(positionMap);
  createMarker(positionMap, map);

  // render traduce y service obtine
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  directionsDisplay.setOptions({
    suppressMarkers : true
  });

  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setMap(map);
      /*crear mascadores con bicicleta*/
      createMarkerBicycle(response.routes[0].legs[0].start_location, map);
      createMarkerBicycle(response.routes[0].legs[0].end_location, map);
      directionsDisplay.setDirections(response);
    } else {
      swal("Ruta no encontrada!" , "Intente cambiando direccion de origen o destino", "error");
    }
  });
  typeMap();
}


/*estilos de mapa*/

var styles = {
  default: null,
  silver: [
    {
      elementType: 'geometry',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#bdbdbd'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#ffffff'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#dadada'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#c9c9c9'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    }
  ],

  night: [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ],

  retro: [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    }
  ],

  hiding: [
    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    }
  ]
};

