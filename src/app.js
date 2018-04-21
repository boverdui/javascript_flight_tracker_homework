const FlightData = require('./models/flight_data.js');
const FlightView = require('./views/flight_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const mapContainer = document.querySelector('#map');

  const flightView = new FlightView(mapContainer);

  const flightData = new FlightData();

  flightData.getData((data) => {
    flightView.renderMap();
    flightView.renderFlights(data.acList);
  });

  const fromAmsButton = document.querySelector('#from-ams');

  fromAmsButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      const filteredData = [];
      data.acList.forEach(flight => {
        if(flight.From === 'EHAM Amsterdam Airport Schiphol, Netherlands') {
          filteredData.push(flight);
        }
      });
      flightView.renderFlights(filteredData);
    });
  });

  const toAmsButton = document.querySelector('#to-ams');

  toAmsButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      const filteredData = [];
      data.acList.forEach(flight => {
        if(flight.To === 'EHAM Amsterdam Airport Schiphol, Netherlands') {
          filteredData.push(flight);
        }
      });
      flightView.renderFlights(filteredData);
    });
  });

  const reloadButton = document.querySelector('#reload');

  reloadButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      flightView.renderFlights(data.acList);
    });
  });

});
