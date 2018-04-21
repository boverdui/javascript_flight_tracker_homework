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
      const selectedFlightData = [];
      data.acList.forEach(flight => {
        if(flight.From === 'EHAM Amsterdam Airport Schiphol, Netherlands') {
          selectedFlightData.push(flight);
        }
      });
      flightView.renderFlights(selectedFlightData);
    });
  });

  const toAmsButton = document.querySelector('#to-ams');

  toAmsButton.addEventListener('click', (evt) => {
    flightData.getData((data) => {
      const selectedFlightData = [];
      data.acList.forEach(flight => {
        if(flight.To === 'EHAM Amsterdam Airport Schiphol, Netherlands') {
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
