var app = (function()
{
    // Application object.
    var app = {};

    // Dictionary of beacons.
    var beacons = {};

    // Timer that displays list of beacons.
    var updateTimer = null;

    app.initialize = function()
    {
        document.addEventListener('deviceready', onDeviceReady, false);
    };

    function onDeviceReady()
    {
        // Start tracking beacons!
        startScan();

        // Display refresh timer.
        updateTimer = setInterval(displayBeaconList, 1000);
    }

    function startScan()
    {

		var logToDom = function (message) {
			var e = document.createElement('label');
			e.innerText = message;

			var br = document.createElement('br');
			var br2 = document.createElement('br');
			document.body.appendChild(e);
			document.body.appendChild(br);
			document.body.appendChild(br2);

			window.scrollTo(0, window.document.height);
		};

		var delegate = new cordova.plugins.locationManager.Delegate();

		delegate.didDetermineStateForRegion = function (pluginResult) {

			logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

			cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
				+ JSON.stringify(pluginResult));
		};

		delegate.didStartMonitoringForRegion = function (pluginResult) {
			console.log('didStartMonitoringForRegion:', pluginResult);

			logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
		};

		delegate.didRangeBeaconsInRegion = function (pluginResult) {
			logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
		};

		var uuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';
		var identifier = 'beaconOnTheSpeaker';
		var minor = 41219;
		var major = 30846;
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

		cordova.plugins.locationManager.setDelegate(delegate);

		// required in iOS 8+
		cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
		// or cordova.plugins.locationManager.requestAlwaysAuthorization()

		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done();
        }

 

    return app;
})();