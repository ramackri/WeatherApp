/* -------------------------------------------weathercontroller.js------------------------------------------------------- */
weatherApp.controller("weatherController", function($scope, $http){
    $scope.weather  = $scope.location = $scope.status = null;
	$scope.loader = false;

    $scope.submit = function() {
	$scope.loader = true;
    $http.jsonp('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + $scope.location + '&units=metric' + '&cnt=1'+ '&callback=JSON_CALLBACK')
    .success(function(data, status) {
        $scope.weather = data;
		$scope.loader = false;
        for (var i = 0; i < data.length; ++i) {
           $scope.items.push('weather' + i);
        }
		
})
}

});

weatherApp.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                   return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
});
