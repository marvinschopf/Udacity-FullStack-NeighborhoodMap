'use strict';

var map;

var mapLocations = [
	{
		title: 'MyZeil (Shopping Center)',
		lat: 50.114354,
		long: 8.681447
	}
];

var Location = function(data) {
	console.log("Location initializes with name "+data.title);
	var self = this;
	this.latitude = data.lat;
	this.longitude = data.long;
	this.url = "";
	this.street = "";
	this.city = "";
	this.phone = "";

	this.visible = ko.observable(true);

	this.content = '<div class="info-window"><span class="title"><b>'+data.title+'</b></span></div>';

	this.iw = new google.maps.InfoWindow({content:self.content});

	this.mark = new google.maps.Marker({
		position: new google.maps.LatLng(data.lat,data.long),
		map:map,
		title:data.title
	});

	this.mark.addListener('click',function() {
		self.iw.setContent(self.content);
		self.iw.open(map,this);
		self.mark.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			self.mark.setAnimation(null);
		},2100);
	});

	this.sm = ko.computed(function() {
		if(this.visible() === true) {
			this.mark.setMap(map);
		} else {
			this.mark.setMap(null);
		}
		return true;
	}, this);

	self.iw.setContent(self.contentString);
}

function AppViewModel() {
	var self = this;

	this.query = ko.observable("");

	this.locations = ko.observableArray([]);

	map = new google.maps.Map(document.getElementsByTagName('mapframe')[0], {
		zoom:12,
		center:{lat:50.113929,lng:8.680652}
	});

	console.log("Intialized map!");

	mapLocations.forEach(function(item) {
		self.locations.push(new Location(item));
		console.log("Pushed new item to locations");
	});

	console.log("Initialized appviewmodel!");

	//this.mapElem.style.height = window.innerHeight - 50;

}

function loadEverything() {
	ko.applyBindings(new AppViewModel());
	console.log("Loaded everything!");
}

function error() {
	alert("An error occured!");
	console.log("An error occured!!");
}