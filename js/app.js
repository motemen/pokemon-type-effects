var pokemonTypeEffectsApp = angular.module('pokemonTypeEffectsApp', []);

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

pokemonTypeEffectsApp.factory('typeEffectsCalculator', function () {
    var __cache = {};

    return {
        calcEffects: function (defTypeNames) {
            if (__cache[defTypeNames]) return __cache[defTypeNames];
            return __cache[defTypeNames] = ALL_TYPE_NAMES.map(function (attTypeName) {
                var attIndex = TYPE_NAME_TO_INDEX[attTypeName];
                var defIndexes = defTypeNames.map(function (n) { return TYPE_NAME_TO_INDEX[n] });

                var effect = 1;
                if (typeof defIndexes[0] !== 'undefined') {
                    effect *= TYPE_EFFECTS_MAXTRIX[attIndex][defIndexes[0]];
                }
                if (typeof defIndexes[1] !== 'undefined' && defIndexes[1] !== defIndexes[0]) {
                    effect *= TYPE_EFFECTS_MAXTRIX[attIndex][defIndexes[1]];
                }

                return {
                    typeName: attTypeName,
                    effect: effect
                };
            });
        }
    };
});

pokemonTypeEffectsApp.factory('defenderTypes', function () {
    return [ 'normal', undefined ];
});

pokemonTypeEffectsApp.controller('MainCtrl', [ '$scope', 'typeEffectsCalculator', 'defenderTypes',
    function ($scope, typeEffectsCalculator, defenderTypes) {
        $scope.allTypes = ALL_TYPE_NAMES;
        $scope.defenderTypes = defenderTypes;
        $scope.allEffects = function () {
            return typeEffectsCalculator.calcEffects($scope.defenderTypes)
        };
    }
]);

pokemonTypeEffectsApp.directive('pokemonTypeSelector', function () {
    function link (scope, element, attr) {
        scope.allTypes = ALL_TYPE_NAMES;

        scope.togglePalette = function () {
            scope.showPalette = !scope.showPalette;
        };

        scope.selectType = function (typeName) {
            scope.selectedType = typeName;
            scope.togglePalette();
        };
    };

    return {
        scope: {
            selectedType: '='
        },
        templateUrl: '_type_selector.html',
        link: link
    };
});

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
