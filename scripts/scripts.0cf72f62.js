"use strict";angular.module("weatherApp",["ngAnimate","ngRoute","ngTouch","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/weather.html"}).when("/cities/:id",{templateUrl:"views/city-detail.html"})}]),angular.module("weatherApp").controller("WeatherCtrl",["weather","$localStorage","$location",function(a,b,c){var d=this;this.query="",this.showForm=!1,this.cities=[],this.$storage=b.$default({columns:2}),this.cityRows=[],this.roomForButton=!0,this.colSpan=function(){return 12/d.$storage.columns},this.search=function(){a.getCityByQuery(d.query,function(a){d.query="",d.showForm=!1,d.cities=a,d.organizeRows()})},this.organizeRows=function(){var a=[];d.cityRows=[];var b=d.$storage.columns-1,c=d.cities.length;d.cities.forEach(function(e,f){var g=f%d.$storage.columns;a.push(e),(g===b||f==c-1)&&(d.cityRows.push(a),a=[])});var e=d.cityRows[d.cityRows.length-1];this.roomForButton=e&&e.length<d.$storage.columns},this.toggleForm=function(){d.showForm=!d.showForm},this.deleteCity=function(b){a.deleteCity(b,function(a){d.cities=a,d.organizeRows()})},this.loadCities=function(){a.loadCities(function(a){d.cities=a,d.organizeRows()})},this.loadCities(),this.debug=function(){return c.search().debug},this.resetStorage=function(){d.$storage.$reset()}}]),angular.module("weatherApp").filter("urlEncode",function(){return window.encodeURIComponent}),angular.module("weatherApp").service("weather",["$http","$localStorage","$filter","urlEncodeFilter",function(a,b,c,d){var e=this;this.$storage=b.$default({cityIds:[],cityQueries:{}}),this.imgFor=function(a){return"http://l.yimg.com/a/i/us/we/52/"+a+".gif"},this.search=function(b,c){var f='select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+b+'")',g="https://query.yahooapis.com/v1/public/yql?q="+d(f)+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";a.get(g).then(function(a){var f=a.data.query.results.channel,g={};g.name=f.location.city,g.state=f.location.region,g.id="CITY-"+d(g.name)+"_STATE-"+g.state,g.dateUpdated=e.todaysDate(),g.temp=f.item.condition.temp,g.text=f.item.condition.text,g.img=e.imgFor(f.item.condition.code),g.forecast=f.item.forecast.map(function(a){return a.img=e.imgFor(a.code),a}),g.feelsLike=f.wind.chill,g.windSpeed=f.wind.speed,g.humidity=f.atmosphere.humidity,g.visibility=f.atmosphere.visibility,g.sunrise=f.astronomy.sunrise,g.sunset=f.astronomy.sunset,-1===e.$storage.cityIds.indexOf(g.id)&&e.$storage.cityIds.push(g.id),e.$storage.cityQueries[b]||(e.$storage.cityQueries[b]=g.id),e.$storage[g.id]||(e.$storage[g.id]=g),c(e.cityData())})},this.cityData=function(){return e.$storage.cityIds.map(function(a){return e.$storage[a]})},this.getCityByQuery=function(a,b){a=a.toLowerCase();var c=e.$storage.cityQueries[a];if(c){var d=e.$storage[c].dateUpdated;e.todaysDate()===d?(-1===e.$storage.cityIds.indexOf(c)&&e.$storage.cityIds.push(c),b(e.cityData())):(e.$storage[c]=null,e.search(a,b))}else e.search(a,b)},this.loadCities=function(a){e.$storage.cityIds.length>0?a(e.cityData()):e.getCityByQuery("Jersey City",a)},this.getCityById=function(a,b){b(e.$storage[d(a)])},this.deleteCity=function(a,b){var c=e.$storage.cityIds.indexOf(a);e.$storage.cityIds.splice(c,1),b(e.cityData())},this.todaysDate=function(){return c("date")(new Date,"MM-dd-yyyy")}}]),angular.module("weatherApp").directive("citySummary",["weather",function(a){return{templateUrl:"views/city-summary.html",restrict:"A",scope:{city:"=",deleteCity:"&"},controller:["$scope",function(a){a.onClickCloseButton=function(){a.deleteCity({cityId:a.city.id})}}]}}]),angular.module("weatherApp").directive("addCity",function(){return{templateUrl:"views/new-city.html",restrict:"A",scope:!0}}),angular.module("weatherApp").controller("CityDetailCtrl",["weather","$routeParams",function(a,b){var c=this;this.city={},a.getCityById(b.id,function(a){c.city=a})}]);