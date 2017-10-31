
locations = [
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

	this.isVisible = ko.observable(true);
}

