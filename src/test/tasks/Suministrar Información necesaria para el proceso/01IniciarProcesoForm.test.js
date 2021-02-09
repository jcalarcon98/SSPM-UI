const {
  areDatesWrong,
} = require('../../../tasks/Suministrar Información necesaria para el proceso/01IniciarProcesoForm');

describe('Tests inside 01IniciarProcesoForm.js file', () => {
  describe('Cases inside areDatesWrong method', () => {
    test('When end Date is greater than initDate, should return false', () => {
      const initDate = new Date();
      const endDate = new Date('December 17, 2021 03:24:00');

      const isInitDateGreaterThanEndDate = areDatesWrong(initDate, endDate);

      expect(isInitDateGreaterThanEndDate).toBe(false);
    });

    test('When initDate is greater than endDate, should return true', () => {
      const initDate = new Date();
      const endDate = new Date('December 17, 1990 03:24:00');

      const isInitDateGreaterThanEndDate = areDatesWrong(initDate, endDate);

      expect(isInitDateGreaterThanEndDate).toBe(true);
    });

    test('When there is no date given, should return false', () => {
      const noDatesResult = areDatesWrong();
      expect(noDatesResult).toBe(false);
    });
  });
});
