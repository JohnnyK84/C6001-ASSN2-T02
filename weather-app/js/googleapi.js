//variables to return gps coordinates.
var lattitude="-37.6878",
    longitude="176.1651",
    //http for weather map api loaded into variable
    openweapi = 
    'http://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&appid=1a7002ce4f09d21794aebec0cd1aa58d',
    places;
  
  //setting all weather data variables from weather api
  $.getJSON(openweapi,function(data){
              
            var city = data.name,
                  epoch = data.dt,
                  description = data.weather[0].description,
                  temperature =  data.main.temp,
                  windspeed =  data.wind.speed;
                  weathericon = data.weather[0].icon,

                  tempcels = (temperature - 273.15).toFixed(2), //convert from kelvin to celsius
                  iconurl = 'http://openweathermap.org/img/w/'+weathericon+'.png'; //setting url for weather icon
                  dateTime = 'https://maps.googleapis.com/maps/api/timezone/json?location='+data.coord.lat+','+data.coord.lon+'&timestamp='+epoch+'&key=AIzaSyBTM7XM-ggjUCaXmlyzwyPrdgKtpF1VZU4';

            var myDate = new Date(data.dt*1000);

            var json1 = $.getJSON(dateTime,function(mapdata){ 
              //setting weather descripton in html table    
              document.getElementById("weatherinfo").innerHTML =
                  "<tr><th>"+ city +"</th></tr>"
                  +"<tr><td>Time Zone:   " + mapdata.timeZoneId + "</td></tr>"
                  +"<tr><td>Local time:   " + myDate.toLocaleString() + "</td></tr>"
                  +"<tr><td>Description:   " + description + "</td></tr>"
                  +"<tr><td>Temperature &#8451; =   " + tempcels + "</td></tr>"
                  +"<tr><td>Windspeed meter/sec =      " + windspeed; "</td></tr>"
              })

              
              //setting icon img url in html
              document.getElementById("iconurl").src=iconurl;
    });

//initiate google.map api
function initAutocomplete(lattitude,longitude,openweapi) {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -37.6878, lng: 176.1651},
      zoom: 12,
      mapTypeId: 'roadmap'
    });   

    //get user input data
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

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
      localStorage.setItem('input', places[0].name);
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
      //window.alert('lattitude:  ' + lattitude + '    longitude:  ' + longitude);
    
      //retrieving data from weather app and displaying
      $.getJSON(openweapi,function(data){
        
        var city = data.name,
            epoch = data.dt,
            description = data.weather[0].description,
            temperature =  data.main.temp,
            windspeed =  data.wind.speed;
            weathericon = data.weather[0].icon,

            tempcels = (temperature - 273.15).toFixed(2), //convert from kelvin to celsius
            iconurl = 'http://openweathermap.org/img/w/'+weathericon+'.png'; //setting url for weather icon
            dateTime = 'https://maps.googleapis.com/maps/api/timezone/json?location='+data.coord.lat+','+data.coord.lon+'&timestamp='+epoch+'&key=AIzaSyBTM7XM-ggjUCaXmlyzwyPrdgKtpF1VZU4';
            
            var myDate = new Date(data.dt*1000);
            
            var json1 = $.getJSON(dateTime,function(mapdata){ 
              //setting weather descripton in html table 
              document.getElementById("weatherinfo").innerHTML =
              "<tr><th>"+ city +"</th></tr>"
              +"<tr><td>Time Zone:   " + mapdata.timeZoneId + "</td></tr>"
              +"<tr><td>Local time:   " + myDate.toLocaleString() + "</td></tr>"
              +"<tr><td>Description:   " + description + "</td></tr>"
              +"<tr><td>Temperature &#8451; =   " + tempcels + "</td></tr>"
              +"<tr><td>Windspeed meter/sec =      " + windspeed; "</td></tr>"
            })
              
        //setting img in html
        document.getElementById("iconurl").src=iconurl;
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