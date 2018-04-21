markers = [];

const FlightView = function (mapContainer) {
  this.mapContainer = mapContainer;
}

FlightView.prototype.renderMap = function () {
    this.googleMap = new google.maps.Map(this.mapContainer, {
      center: {lat: 55.9533, lng: -3.1883},
      zoom: 10
    });
}

FlightView.prototype.renderFlights = function (data) {
  clearMarkers();
  data.forEach(flight => {
    if(flight.Lat === undefined || flight.Long === undefined) {
      return
    }
    const icon = {
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Plane_icon_nose_up.svg',
      scaledSize: new google.maps.Size(20,20)
    }
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {lat: flight.Lat, lng: flight.Long},
      icon: icon
    });
    markers.push(marker);
    const contentString =
    '<div id="content">' +
    `Operator: ${flight.Op}` + '<br>' +
    `From:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${flight.From}` + '<br>' +
    `To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${flight.To}` + '<br>' +
    `Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${flight.Mdl}` + '<br>' +
    '</div>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });
    marker.addListener('click', function () {
      infowindow.open(this.googlemap, marker);
    });
  });
}

const clearMarkers = function () {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

module.exports = FlightView;
