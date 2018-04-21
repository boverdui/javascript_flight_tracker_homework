const Request = require('../helpers/request.js');

const FlightData = function() {
  this.url = 'http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json';
  this.data = null;
}

FlightData.prototype.getData = function (onComplete) {
  const request = new Request(this.url);
  request.get((data) => {
    this.data = data;
    onComplete(data);
  });
}

module.exports = FlightData;
