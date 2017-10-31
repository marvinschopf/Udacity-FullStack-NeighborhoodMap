
mapLocations = [
	{
		title: 'MyZeil (Shopping Center)',
		lat: 50.114354,
		long: 8.681447
	}
];

var Location = function(data) {
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

	this.sm = ko.computed(function() {
		if(this.visible() === true) {
			this.mark.setMap(map);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);

	self.iw.setContent(self.contentString);
}

function AppViewModel() {
	var self = this;

	this.query = ko.observable("");

	this.locations = ko.observableArray([]);

	map = new google.maps.Map(document.getElementById('map'), {
		zoom:11,
		center:{lat:50.113929,lng:8.680652}
	});

	mapLocations.forEach(function(item) {
		self.locations.push(new Location(item));
	});
}

function loadEverything() {
	ko.applyBindings(new AppViewModel());
}