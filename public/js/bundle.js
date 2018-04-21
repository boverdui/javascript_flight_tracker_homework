/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const FlightData = __webpack_require__(/*! ./models/flight_data.js */ \"./src/models/flight_data.js\");\nconst FlightView = __webpack_require__(/*! ./views/flight_view.js */ \"./src/views/flight_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  const mapContainer = document.querySelector('#map');\n\n  const flightView = new FlightView(mapContainer);\n\n  const flightData = new FlightData();\n\n  flightData.getData((data) => {\n    flightView.renderMap();\n    flightView.renderFlights(data.acList);\n  });\n\n  const fromAmsButton = document.querySelector('#from-ams');\n\n  fromAmsButton.addEventListener('click', (evt) => {\n    flightData.getData((data) => {\n      const filteredData = [];\n      data.acList.forEach(flight => {\n        if(flight.From === 'EHAM Amsterdam Airport Schiphol, Netherlands') {\n          filteredData.push(flight);\n        }\n      });\n      flightView.renderFlights(filteredData);\n    });\n  });\n\n  const toAmsButton = document.querySelector('#to-ams');\n\n  toAmsButton.addEventListener('click', (evt) => {\n    flightData.getData((data) => {\n      const filteredData = [];\n      data.acList.forEach(flight => {\n        if(flight.To === 'EHAM Amsterdam Airport Schiphol, Netherlands') {\n          filteredData.push(flight);\n        }\n      });\n      flightView.renderFlights(filteredData);\n    });\n  });\n\n  const reloadButton = document.querySelector('#reload');\n\n  reloadButton.addEventListener('click', (evt) => {\n    flightData.getData((data) => {\n      flightView.renderFlights(data.acList);\n    });\n  });\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url) {\n  this.url = url;\n};\n\nRequest.prototype.get = function(onComplete) {\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n  request.addEventListener('load', function() {\n    if(this.status !== 200) {\n      return;\n    }\n    const responseBody = JSON.parse(this.responseText);\n    onComplete(responseBody);\n  });\n  request.send();\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/flight_data.js":
/*!***********************************!*\
  !*** ./src/models/flight_data.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\n\nconst FlightData = function() {\n  this.url = 'http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json';\n  this.data = null;\n}\n\nFlightData.prototype.getData = function (onComplete) {\n  const request = new Request(this.url);\n  request.get((data) => {\n    this.data = data;\n    onComplete(data);\n  });\n}\n\nmodule.exports = FlightData;\n\n\n//# sourceURL=webpack:///./src/models/flight_data.js?");

/***/ }),

/***/ "./src/views/flight_view.js":
/*!**********************************!*\
  !*** ./src/views/flight_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("markers = [];\n\nconst FlightView = function (mapContainer) {\n  this.mapContainer = mapContainer;\n}\n\nFlightView.prototype.renderMap = function () {\n    this.googleMap = new google.maps.Map(this.mapContainer, {\n      center: {lat: 52.3105, lng: 4.7683},\n      zoom: 10\n    });\n}\n\nFlightView.prototype.renderFlights = function (data) {\n  clearMarkers();\n  data.forEach(flight => {\n    if(flight.Lat === undefined || flight.Long === undefined) {\n      return\n    }\n    const icon = {\n      url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Plane_icon_nose_up.svg',\n      scaledSize: new google.maps.Size(20,20)\n    }\n    const marker = new google.maps.Marker({\n      map: this.googleMap,\n      position: {lat: flight.Lat, lng: flight.Long},\n      icon: icon\n    });\n    markers.push(marker);\n    const contentString =\n    '<div id=\"content\">' +\n    `From:&nbsp;&nbsp;&nbsp;&nbsp; ${flight.From}` + '<br>' +\n    `To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${flight.To}` + '<br>' +\n    `Operator: ${flight.Op}` + '<br>' +\n    `Type:&nbsp;&nbsp;&nbsp;&nbsp; ${flight.Mdl}` + '<br>' +\n    `Altitude: ${flight.Alt} feet` + '<br>' +\n    '</div>';\n    const infowindow = new google.maps.InfoWindow({\n      content: contentString,\n      maxWidth: 400\n    });\n    marker.addListener('click', function () {\n      infowindow.open(this.googlemap, marker);\n    });\n  });\n}\n\nconst clearMarkers = function () {\n  for (var i = 0; i < markers.length; i++ ) {\n    markers[i].setMap(null);\n  }\n  markers.length = 0;\n}\n\nmodule.exports = FlightView;\n\n\n//# sourceURL=webpack:///./src/views/flight_view.js?");

/***/ })

/******/ });