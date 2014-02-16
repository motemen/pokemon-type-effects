var pokemonTypeEffectsApp = angular.module('pokemonTypeEffectsApp', [ 'ui.bootstrap' ]);

pokemonTypeEffectsApp.config([ '$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }
]);

pokemonTypeEffectsApp.factory('defs', function () {
    var ALL_TYPE_NAMES = [
        'normal',
        'fire',
        'water',
        'electric',
        'grass',
        'ice',
        'psychic',
        'fighting',
        'poison',
        'ground',
        'flying',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy'
    ];

    var TYPE_NAME_AS_JA = {
        normal:   'ノーマル',
        fire:     'ほのお',
        water:    'みず',
        electric: 'でんき',
        grass:    'くさ',
        ice:      'こおり',
        psychic:  'エスパー',
        fighting: 'かくとう',
        poison:   'どく',
        ground:   'じめん',
        flying:   'ひこう',
        bug:      'むし',
        rock:     'いわ',
        ghost:    'ゴースト',
        dragon:   'ドラゴン',
        dark:     'あく',
        steel:    'はがね',
        fairy:    'フェアリー'
    };

    var TYPE_NAME_TO_INDEX = (function () {
        var map = {};
        for (var i = 0, len = ALL_TYPE_NAMES.length; i < len; i++) {
            map[ALL_TYPE_NAMES[i]] = i;
        }
        return map;
    })();

    // [attacker move type][defender type] = effect ratio
    var TYPE_EFFECTS_MAXTRIX = [
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   0,   1,   1, 0.5,   1],
        [  1, 0.5, 0.5,   1,   2,   2,   1,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1],
        [  1,   2, 0.5,   1, 0.5,   1,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1,   1],
        [  1,   1,   2, 0.5, 0.5,   1,   1,   1,   1,   0,   2,   1,   1,   1, 0.5,   1,   1,   1],
        [  1, 0.5,   2,   1, 0.5,   1,   1,   1, 0.5,   2, 0.5, 0.5,   2,   1, 0.5,   1, 0.5,   1],
        [  1, 0.5, 0.5,   1,   2, 0.5,   1,   1,   1,   2,   2,   1,   1,   1,   2,   1, 0.5,   1],
        [  1,   1,   1,   1,   1,   1, 0.5,   2,   2,   1,   1,   1,   1,   1,   1,   0, 0.5,   1],
        [  2,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1, 0.5, 0.5,   2,   0,   1,   2,   2, 0.5],
        [  1,   1,   1,   1,   2,   1,   1,   1, 0.5, 0.5,   1,   1, 0.5, 0.5,   1,   1,   0,   2],
        [  1,   2,   1,   2, 0.5,   1,   1,   1,   2,   1,   0, 0.5,   2,   1,   1,   1,   2,   1],
        [  1,   1,   1, 0.5,   2,   1,   1,   2,   1,   1,   1,   2, 0.5,   1,   1,   1, 0.5,   1],
        [  1, 0.5,   1,   1,   2,   1,   2, 0.5, 0.5,   1, 0.5,   1,   1, 0.5,   1,   2, 0.5, 0.5],
        [  1,   2,   1,   1,   1,   2,   1, 0.5,   1, 0.5,   2,   2,   1,   1,   1,   1, 0.5,   1],
        [  0,   1,   1,   1,   1,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   1,   1],
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   0],
        [  1,   1,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   2,   1, 0.5,   1, 0.5],
        [  1, 0.5, 0.5, 0.5,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1, 0.5,   2],
        [  1, 0.5,   1,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   2,   2, 0.5,   1]
    ];

    return {
        ALL_TYPE_NAMES: ALL_TYPE_NAMES,
        TYPE_NAME_AS_JA: TYPE_NAME_AS_JA,
        TYPE_NAME_TO_INDEX: TYPE_NAME_TO_INDEX,
        TYPE_EFFECTS_MAXTRIX: TYPE_EFFECTS_MAXTRIX
    };
});

pokemonTypeEffectsApp.factory('typeEffectsCalculator', [ 'defs',
    function (defs) {
        var __cache = {};

        return {
            calcEffects: function (defTypeNames) {
                if (__cache[defTypeNames]) return __cache[defTypeNames];
                return __cache[defTypeNames] = defs.ALL_TYPE_NAMES.map(function (attTypeName) {
                    var attIndex = defs.TYPE_NAME_TO_INDEX[attTypeName];
                    var defIndexes = defTypeNames.map(function (n) { return defs.TYPE_NAME_TO_INDEX[n] });

                    var effect = 1;
                    if (typeof defIndexes[0] !== 'undefined') {
                        effect *= defs.TYPE_EFFECTS_MAXTRIX[attIndex][defIndexes[0]];
                    }
                    if (typeof defIndexes[1] !== 'undefined' && defIndexes[1] !== defIndexes[0]) {
                        effect *= defs.TYPE_EFFECTS_MAXTRIX[attIndex][defIndexes[1]];
                    }

                    return {
                        typeName: attTypeName,
                        effect: effect
                    };
                });
            }
        };
    }
]);

pokemonTypeEffectsApp.controller('MainCtrl', [ '$scope', 'typeEffectsCalculator', 'defs',
    function ($scope, typeEffectsCalculator, defs) {
        $scope.allTypes = defs.ALL_TYPE_NAMES;
        $scope.defenderTypes = [ 'normal', undefined ];
        $scope.allEffects = function () {
            return typeEffectsCalculator.calcEffects($scope.defenderTypes)
        };
        $scope.$watch('defenderTypes[0]', function () {
            $scope.defenderTypes[1] = undefined;
        });
    }
]);

pokemonTypeEffectsApp.controller('TypeSelectorCtrl', [ '$scope', '$modalInstance', 'defs',
    function ($scope, $modalInstance, defs) {
        $scope.allTypes = defs.ALL_TYPE_NAMES;
        $scope.selectType = function (typeName) {
            $modalInstance.close(typeName);
        };
    }
]);

pokemonTypeEffectsApp.factory('typeSelector', [ '$rootScope', '$modal', '$location',
    function ($rootScope, $modal, $location) {
        var typeSelector = {
            modalInstance: null
        };

        $rootScope.$watch(function () {
            return $location.hash();
        }, function (newHash) {
            if (newHash === '') {
                if (typeSelector.modalInstance) {
                    typeSelector.modalInstance.dismiss();
                }
            }
        });

        typeSelector.showPalette = function () {
            if (typeSelector.modalInstance) return null;

            typeSelector.modalInstance = $modal.open({
                templateUrl: 'type_palette.html',
                controller: 'TypeSelectorCtrl'
            });

            $location.hash('palette');

            var result = typeSelector.modalInstance.result;

            result['finally'](function () {
                $location.hash(null);
                typeSelector.modalInstance = null;
            });

            return result;
        };

        return typeSelector;
    }
]);

pokemonTypeEffectsApp.directive('pokemonTypeSelector', [ '$modal', 'typeSelector', '$location', 'defs',
    function ($modal, typeSelector, $location, defs) {
        function link (scope, element, attr) {
            scope.allTypes = defs.ALL_TYPE_NAMES;

            scope.togglePalette = function () {
                var result = typeSelector.showPalette();
                if (result) {
                    result.then(function (typeName) {
                        scope.selectedType = typeName;
                    });
                }
            };
        };

        return {
            scope: {
                selectedType: '='
            },
            templateUrl: 'type_selector.html',
            link: link
        };
    }
]);

pokemonTypeEffectsApp.filter('numberAsEffect', function () {
    return function (number) {
        if (number === 0.25) {
            return '\u00BC';
        } else if (number === 0.5) {
            return '\u00BD'
        } else {
            return number;
        }
    };
});

pokemonTypeEffectsApp.filter('displayTypeName', [ 'defs',
    function (defs) {
        return function (typeName) {
            return defs.TYPE_NAME_AS_JA[typeName] || typeName;
        }
    }
]);
