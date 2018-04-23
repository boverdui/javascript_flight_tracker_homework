const FlightData = require('./models/flight_data.js');
const FlightView = require('./views/flight_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const mapContainer = document.querySelector('#map');
  const fromAmsButton = document.querySelector('#from-ams');
  const toAmsButton = document.querySelector('#to-ams');
  const reloadButton = document.querySelector('#reload');

  const flightData = new FlightData();
  const flightView = new FlightView(mapContainer);

  flightData.getData((data) => {
    flightView.renderMap();
    flightView.renderFlights(data.acList);
  });

  const filterData = (data, filter) => {
    const filteredData = [];
    data.acList.forEach(flight => {
      if(flight[filter] === 'EHAM Amsterdam Airport Schiphol, Netherlands') {
        filteredData.push(flight);
      }
    });
    return filteredData;
  }

  fromAmsButton.addEventListener('click', () => {
    flightData.getData((data) => {
      const filteredData = filterData(data, 'From');
      flightView.renderFlights(filteredData);
    });
  });

  toAmsButton.addEventListener('click', () => {
    flightData.getData((data) => {
      const filteredData = filterData(data, 'To');
      flightView.renderFlights(filteredData);
    });
  });

  reloadButton.addEventListener('click', () => {
    flightData.getData((data) => {
      flightView.renderFlights(data.acList);
    });
  });

});
