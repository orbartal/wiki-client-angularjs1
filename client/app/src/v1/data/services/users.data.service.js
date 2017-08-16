﻿(function () {
    'use strict';

    angular
        .module('wikiApp')
        .factory('UsersResourcesService', UsersResourcesService);

    UsersResourcesService.$inject = ['$q'];
    function UsersResourcesService($q) {
        var service = {};
        service.getAll = getAll;
        service.getById = getById;
        service.create = createUser;
        service.update = updateUser;
        service.delete = deleteUser;
        return service;

        function getAll () {
            var user1 = {"id" : 1, "name": "admin"};
            var user2 = {"id" : 1, "name": "user1"};
            var userAdmin = {"id" : 2, "name": "user2"};
            var results = [user1, user2, userAdmin];
            return $q.when(results);
        }

        function getById(id) {
            var result = {"id" : id};
            return $q.when(result);
        }

        function createUser(user) {
            return $q.when(user);
        }

        function updateUser(user) {
              return $q.when(user);
        }

        function deleteUser(user) {
            return $q.when(user);
        }

        // private functions
        function onSuccess(result) {
        	return result.data;
        }

        function onFailure(error) {
            throw error.data;
        }
    }

})();
