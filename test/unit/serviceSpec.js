'use strict';

describe('service', function () {
    beforeEach(module('pokemonTypeEffectsApp'));

    describe('typeEffectsCalculator', function () {
        it('should have calcEffects method', inject(function (typeEffectsCalculator) {
            expect(typeEffectsCalculator.calcEffects).toBeDefined();
        }));

        it('should calcluate correctly', inject(function (typeEffectsCalculator) {
            var effects = typeEffectsCalculator.calcEffects([ 'normal', undefined ]);
            expect(effects).toContain({ typeName: 'ghost',    effect: 0 });
            expect(effects).toContain({ typeName: 'fighting', effect: 2 });
        }));
    });
});
