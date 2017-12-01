angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.items = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/shopping').success(function(data){
				angular.copy(data, $scope.items);
			});
    };
    $scope.getAll();
    $scope.create = function(item) {
			return $http.post('/shopping', item).success(function(data){
				$scope.items.push(data);
			});
    };
    $scope.dopurchase = function() {
      console.log("In dopurchase");
      angular.forEach($scope.items, function(value,key) {
        if(value.selected) {
          $scope.quantity(value);
          $scope.cart.push(value);
        }
      });
    }

    $scope.quantity = function(item) {
      return $http.put('/shopping/' + item._id + '/shop')
        .success(function(data){
          console.log("buy worked");
          item.quantity += 1;
        });
    };

    $scope.addItem = function() {
      var newObj = {name:$scope.formContent, price:$scope.pricing, quantity:0, image:$scope.url};
      $scope.create(newObj);
      $scope.formContent = '';
      $scope.pricing = '';
      $scope.url = '';
    }

    $scope.incrementQuantity = function(item) {
      $scope.shop(item);
    };
 
    $scope.delete = function(item) {
      console.log("Deleting Name "+item.name+" ID "+item._id);
      $http.delete('/shopping/'+item._id)
        .success(function(data){
          console.log("delete worked");
	  $scope.getAll();
      });
     
    };
  }
]);
