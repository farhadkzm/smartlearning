/**
 * Developed by Navid Ghahremani (ghahramani.navid@gmail.com)
 */

(function (angular) {
    'use strict';

    angular
        .module('admin.configuration')
        .factory('Configuration', ConfigurationFactory);

    ConfigurationFactory.$inject = [
        '$filter',
        '$http'
    ];
    /* @ngInject */
    function ConfigurationFactory($filter, $http) {
        return {
            get: get,
            getEnv: getEnv
        };

        ////////////////

        function get() {
            return $http.get('management/configprops').then(getConfigPropsComplete);

            function getConfigPropsComplete(response) {
                var properties = [];
                angular.forEach(
                    response.data, function (data) {
                        properties.push(data);
                    }
                );
                var orderBy = $filter('orderBy');
                return orderBy(properties, 'prefix');
            }
        }

        function getEnv() {
            return $http.get('/management/env').then(getEnvComplete);

            function getEnvComplete(response) {
                var properties = {};
                angular.forEach(
                    response.data, function (val, key) {
                        var vals = [];
                        angular.forEach(
                            val, function (v, k) {
                                vals.push(
                                    {
                                        key: k,
                                        val: v
                                    }
                                );
                            }
                        );
                        properties[key] = vals;
                    }
                );
                return properties;
            }
        }
    }

})(angular);