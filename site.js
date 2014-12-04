L.mapbox.accessToken = 'pk.eyJ1IjoidHJpc3RlbiIsImEiOiJiUzBYOEJzIn0.VyXs9qNWgTfABLzSI3YcrQ';

var southWest = L.latLng(40.6477, -74.2133),
    northEast = L.latLng(40.8615, -73.8540),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.mapbox.map('map',  'tristen.a71db56b', {
  infoControl: false,
  attributionControl: true,
  maxBounds: bounds,
  minZoom: 13
});

map.setView([40.7855, -73.9711], 14);
map.scrollWheelZoom.disable();

var geojson = {
  'type': 'Feature',
  'properties': {
    'title': 'UN&nbsp;HQ'
    },
  'geometry': {
    'type': 'Point',
    'coordinates': [
      -73.96772861480713,
      40.74895165543915
    ]
  }
};

var locations = L.mapbox.featureLayer().addTo(map);
locations.setGeoJSON(geojson);
locations.eachLayer(function(l) {
  var props = l.feature.properties;
  var m = L.divIcon({
    className: 'marker fill-green2',
    iconSize: [60,60],
    popupAnchor: [0, -20],
  });

  l.setIcon(m);
  l.bindPopup(props.title, {
    autoPan: false
  });
});


var menu = document.getElementById('menu');
var val = 0;

menu.onscroll = function(e) {
  var pos = menu.scrollTop;
  var up = (pos - val) * 0.5;
  var down = -(val - pos) * 0.5;
  map.panBy(L.point(0, (pos > val) ? down : up), { animate:false });
  val = pos;
};

// Slideshow
$(function() {
  var slides = $('.slide');
  var tooltip = $('#tooltip');

  $('.slideshow').slick({
    autoplay: true,
    speed: 200,
    autoplaySpeed: 4000,
    onInit: function() {
      tooltip.html($(slides.get(0)).find('.caption').html());
    },
    onBeforeChange: function() {
      tooltip
        .removeClass('on')
        .addClass('off');
    },
    onAfterChange: function(ev, i) {
      tooltip
        .removeClass('off')
        .addClass('on')
        .html($(slides.get(i)).find('.caption').html());
    }
  });
});
