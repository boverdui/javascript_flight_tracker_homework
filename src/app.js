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

  const fromEdiButton = document.querySelector('#from-edi');

  fromEdiButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      const selectedFlightData = [];
      data.acList.forEach(flight => {
        if(flight.From === 'EGPH Edinburgh, United Kingdom') {
          selectedFlightData.push(flight);
        }
      });
      flightView.renderFlights(selectedFlightData);
    });
  });

  const toEdiButton = document.querySelector('#to-edi');

  toEdiButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      const selectedFlightData = [];
      data.acList.forEach(flight => {
        if(flight.To === 'EGPH Edinburgh, United Kingdom') {
          selectedFlightData.push(flight);
        }
      });
      flightView.renderFlights(selectedFlightData);
    });
  });

  const milButton = document.querySelector('#mil');

  milButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      const selectedFlightData = [];
      data.acList.forEach(flight => {
        if(flight.Mil) {
          selectedFlightData.push(flight);
        }
      });
      flightView.renderFlights(selectedFlightData);
    });
  });

});
