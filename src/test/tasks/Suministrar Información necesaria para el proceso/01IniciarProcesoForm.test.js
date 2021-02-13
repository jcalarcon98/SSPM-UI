const {
  areDatesWrong,
  getGrades,
  isManagerEmailIncorrect,
  verifyCorrectRate,
} = require('../../../tasks/Suministrar Información necesaria para el proceso/01IniciarProcesoForm');

describe('Tests inside 01IniciarProcesoForm.js file', () => {
  const resultStudents = [
    ['Nombres', 'Apellidos', 'Ciclo', 'Paralelo', 'Correo', 'Nota'],
    ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon@unl.edu.ec', '9.99'],
    ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon1@unl.edu.ec', '9.99'],
    ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon2@unl.edu.ec', '9.99'],
    ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon3@unl.edu.ec', '9.99'],
    ['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'edgar.soto@unl.edu.ec', '9.99'],
    ['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'edgar.soto1@unl.edu.ec', '9.99'],
  ];

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

  describe('Cases inside getGrades method', () => {
    test('When Students csv is valid and We have data inside resultStudents, should return an array with all grades inside', () => {
      const isStudentsCsvInvalid = false;
      const grades = getGrades(isStudentsCsvInvalid, resultStudents);

      expect(grades).not.toBeNull();
      expect(grades).toHaveLength(2);
    });

    test('When entering 4 students with the same parallel and grade number, should return an object with the property students with the same amount(4)', () => {
      const isStudentsCsvInvalid = false;
      const grades = getGrades(isStudentsCsvInvalid, resultStudents);

      const [firstGrade, secondGrade] = grades;
      expect(firstGrade.students).toHaveLength(4);
      expect(secondGrade.students).toHaveLength(2);
    });

    test('When isStudentsCsvInvalid is True, should return null', () => {
      const isStudentsCsvInvalid = true;
      const grades = getGrades(isStudentsCsvInvalid, resultStudents);

      expect(grades).toBeNull();
    });

    test('When resultStudents is null or undefined, should return null', () => {
      const isStudentsCsvInvalid = false;

      const grades = getGrades(isStudentsCsvInvalid, undefined || null);

      expect(grades).toBeNull();
    });

    test('When entering an empty elements at the first position inside resultStudents, should return an array without taking into account this elements', () => {
      const isStudentsCsvInvalid = false;
      const amountOfRowsNotTakingIntoAccount = 1;
      const initLenght = resultStudents.length - amountOfRowsNotTakingIntoAccount;
      resultStudents.push([''], [''], ['']);

      const grades = getGrades(isStudentsCsvInvalid, resultStudents);

      let amountOfStudents = 0;

      grades.forEach((grade) => {
        amountOfStudents += grade.students.length;
      });

      expect(amountOfStudents).toBe(initLenght);
    });
  });

  describe('Cases inside isManagerEmailIncorrect method', () => {
    test('When manager email contains unl domain, should return false', () => {
      const managerEmail = 'jean.alarcon@unl.edu.ec';

      const isEmailIncorrect = isManagerEmailIncorrect(managerEmail);

      expect(isEmailIncorrect).toBe(false);
    });

    test('When manager email not contains unl domain, should return true', () => {
      const managerEmail = 'jean.alarcon@gmail.com';

      const isEmailIncorrect = isManagerEmailIncorrect(managerEmail);

      expect(isEmailIncorrect).toBe(true);
    });

    test('When manager email size is lower than 10 characters, should return false', () => {
      const isEmailIncorrect = isManagerEmailIncorrect('nomatter');

      expect(isEmailIncorrect).toBe(false);
    });
  });

  describe('Cases inside verifyCorrectRate method', () => {
    test('When invalid number is provided, should return false', () => {
      const invalidNumber = '9.99SADAS';

      const isRateCorrect = verifyCorrectRate(invalidNumber);

      expect(isRateCorrect).toBe(false);
    });

    test('When valid number is provided, should return true', () => {
      const invalidNumber = '9.99';

      const isRateCorrect = verifyCorrectRate(invalidNumber);

      expect(isRateCorrect).toBe(true);
    });

    test('When number is not provided, should return false', () => {
      const isRateCorrect = verifyCorrectRate();

      expect(isRateCorrect).toBe(false);
    });
  });
});
