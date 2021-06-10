
import $ from 'jquery';
import jQuery from 'jquery';
import logMessage from './logger'
var window
var responseData;

function fetchData(callbackSubmitCountry,USA_STATES="Alabama"){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://covid-19-statistics.p.rapidapi.com/reports?q=US%20"+USA_STATES+"&region_name=US&iso=USA&region_province="+USA_STATES,
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "e73c7ef966msh161b8511ef7c806p15defajsne448ce56cc90",
			"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
		}
	};
	$.ajax(settings).done(function (response) {
		logMessage(response);
		$(callbackSubmitCountry).removeAttr("disabled");
		responseData = response
		$("#jsonOUTPUT").html(JSON.stringify(response));
		updateStateDemographics(responseData);
	});
}

function updateStateDemographics(response){
	$("#responseOutput").html("");
	$("#jsonOUTPUTcities").html("");
	$("#responseOutput").append("<b><p>" + responseData.data[0].region.province);
	$.each( responseData.data[0], function( key, value ) {
		$("#responseOutput").append("<p>" + key + ": " + value );
	});
	$.each( responseData.data[0].region.cities, function( key, value ) {
	$("#jsonOUTPUTcities").append("<p>" + responseData.data[0].region.cities[key].name + "<span style=\"color:#BFFF00\"> - confirmed: " + responseData.data[0].region.cities[key].confirmed + "<span style=\"color:red\"> - deaths: " + responseData.data[0].region.cities[key].deaths );
});
}

const USA_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "Samoa", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];	
var input_USA_State = document.createElement("select");
for (var i = 0; i <USA_STATES.length; i++) {
	$(input_USA_State).append("<option value="+USA_STATES[i]+">"+USA_STATES[i]);
}
$("#inputs").append(input_USA_State)

$("#inputs").append(" <button type=\"button\" id=\"submitCountry\" class=\"btn btn-success\">Submit</button>")
$("#submitCountry").on("click",function(){$(this).attr("disabled","disabled"); fetchData(this,$("#inputs select option:selected").text())})