# Assessment 3 - Added Feature

This assessment requires an added feature and a fixed bug in the Google Maps app that my group created for Milestone 2.  

For the feature, I chose to add the date and time for each location that the user searches for on the two maps. &nbsp;This data is additional to the weather information already displayed. &nbsp;It is sourced from the same JSON data string obtained from the openweathermap.org/api site and then converted from Epoch Time to "human readable" date and time.

To isolate the date/time data, I created the variable: epoch = data.dt. &nbsp;The data is then parsed in the formula: myDate = new Date(epoch*1000) to become: mm/dd/yyyy, h:mm:ss AM or PM. &nbsp;The code for that formula comes from the webpage https://www.epochconverter.com/programming/#javascript &nbsp;The time zone is sourced from the 'mapdata' function which extracts JSON data from the site: https://maps.googleapis.com/maps/api/timezone

