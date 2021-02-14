const {
  verifyIfExistMoreThanTwoAlternatives,
  verifyIfExistMoreThanOneIndicators,
} = require('../../../tasks/Suministrar Información necesaria para el proceso/02PlanificarActividadesForm');

describe('Tests inside 02PlanificarActividades.js file', () => {
  describe('Cases inside verifyIfExistMoreThanTwoAlternatives', () => {
    let alternatives = [];

    beforeEach(() => {
      alternatives = [
        { description: 'Alternative number one' },
        { description: 'Alternative number two' },
        { description: 'Alternative number three' },
      ];
    });

    test('When there are 2 or more alternatives, should return false', () => {
      const { isIncorrect } = verifyIfExistMoreThanTwoAlternatives(alternatives);

      expect(isIncorrect).toBe(false);
    });

    test('When there are less than 2 alternatives, should return true', () => {
      const alternativeError = 'Debe ingresar al menos dos alternativas';

      alternatives.pop();
      alternatives.pop();

      const { isIncorrect, errorMessage } = verifyIfExistMoreThanTwoAlternatives(alternatives);
      expect(isIncorrect).toBe(true);
      expect(errorMessage).toBe(alternativeError);
    });
  });

  describe('Cases inside verifyIfExistMoreThanOneIndicators', () => {
    let indicators = [];

    beforeEach(() => {
      indicators = [
        { description: 'Indicator One' },
        { description: 'Indicator Two' },
        { description: 'Indicator Three' },
      ];
    });

    test('When there are one ore more indicators, should return false', () => {
      const { isIncorrect } = verifyIfExistMoreThanOneIndicators(indicators);

      expect(isIncorrect).toBe(false);
    });

    test('When there are less than one indicator, should return true', () => {
      indicators = [];

      const { isIncorrect } = verifyIfExistMoreThanOneIndicators(indicators);

      expect(isIncorrect).toBe(true);
    });
  });
});
