function googleApiInIt(
  lattitudeCoord, longitudeCoord, mapDisplay,
  inputText, storageKey, weatherOutput, weatherImg,
  tableId, cityId){
    //variables to return gps coords.
    var lattitude = lattitudeCoord,
    longitude = longitudeCoord,
    //http for weather map api loaded into variable
    openweapi = 
    'http://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&appid=1a7002ce4f09d21794aebec0cd1aa58d',
    places;

    //setting all weather data variables from weather api
    $.getJSON(openweapi,function(data){
              
              var city = data.name,
                  description = data.weather[0].description,
                  temperature =  data.main.temp,
                  windspeed =  data.wind.speed;
                  weathericon = data.weather[0].icon,

                  tempcels = (temperature - 273.15).toFixed(2), //covert from kelvin to celsius
                  iconurl = 'http://openweathermap.org/img/w/'+weathericon+'.png'; //setting url for weather icon

              //setting weather descripton in html table    
              document.getElementById(weatherOutput).innerHTML =
              "<tr><th>"+ city +"</th></tr>"
              +"<tr><td>Description:   " + description + "</td></tr>"
              +"<tr><td>Temperature &#8451; =   " + tempcels + "</td></tr>"
              +"<tr><td>Windspeed meter/sec =      " + windspeed; "</td></tr>"
              
              //setting icon img url in html
              document.getElementById(weatherImg).src=iconurl;
    });

    //initiate google.map api
    function initAutocomplete(lattitude,longitude,openweapi) {

    var map = new google.maps.Map(document.getElementById(mapDisplay), {
      center: {lat: lattitudeCoord, lng: longitudeCoord},
      zoom: 12,
      mapTypeId: 'roadmap'
    });   

    //get user input data
    var input1 = document.getElementById(inputText);
    var searchBox = new google.maps.places.SearchBox(input1);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return; 
    }
    if (places.length ==1) {
      localStorage.setItem(storageKey, places[0].name);
    }
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
        markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      //receiving gps coord from google places api
      lattitude = place.geometry.location.lat(),
      longitude = place.geometry.location.lng();

      //http for weather map api loaded into variable
      var openweapi = 
      'http://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&appid=1a7002ce4f09d21794aebec0cd1aa58d';

      // pop up alert to display lattitude / longitude coords
      //window.alert('latttitude:  ' + lattitude + '    longitude:  ' + longitude);

      //retrieving data from weather app and displaying
      $.getJSON(openweapi,function(data){
        
        var city = data.name,
            description = data.weather[0].description,
            temperature =  data.main.temp,
            windspeed =  data.wind.speed;
            weathericon = data.weather[0].icon,

            tempcels = (temperature - 273.15).toFixed(2), //covert from kelvin to celsius
            iconurl = 'http://openweathermap.org/img/w/'+weathericon+'.png'; //setting url for weather icon

        //setting weather descripton in html table    
        document.getElementById(weatherOutput).innerHTML =
        "<tr><th>"+ city +"</th></tr>"
        +"<tr><td>Description:   " + description + "</td></tr>"
        +"<tr><td>Temperature &#8451; =   " + tempcels + "</td></tr>"
        +"<tr><td>Windspeed meter/sec =      " + windspeed; "</td></tr>"
        
        //setting img in html
        document.getElementById(weatherImg).src=iconurl;

        var input = localStorage.getItem(storageKey);        
        var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q= " + input + " &appid=627c45bdea11c60f24e536fd8aa8328a&units=metric";
        $(cityId).text(input);
        $.getJSON(weatherUrl,
        function (data) {
            var tr;
            $(tableId).html("");
            for (var i = 5; i < data.list.length; i=i+8) {
                tr = $('<tr/>');
                tr.append("<td>" + moment(data.list[i].dt_txt).format('dddd') + "</td>");
                tr.append("<td>" + data.list[i].main.temp + " °C" + "</td>");
                tr.append("<td>" + data.list[i].weather[0].description + "</td>");
                tr.append("<td>" + data.list[i].wind.speed + " km/ph" + "</td>");
                $(tableId).append(tr);
            }
        });
    });
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

      map.fitBounds(bounds);

    });
  }
  initAutocomplete();
}
function googleOnLoad()
{
  googleApiInIt(
    -37.6878, 176.1651, 'map', 
    'pac-input', 'input1', 'weatherinfo', 'iconurl',
    '#moreWeatherDetails', '#city'
  );

  googleApiInIt(
    -43.525650, 172.639847, 'map2',
    'pac-input2', 'input2', 'weatherinfo2', 'iconurl2',
    '#moreWeatherDetails2', '#city2'
  );
}