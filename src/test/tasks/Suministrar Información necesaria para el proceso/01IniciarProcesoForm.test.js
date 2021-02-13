const {
  areDatesWrong,
  getGrades,
  isManagerEmailIncorrect,
  verifyCorrectRate,
  compareSizeContent,
  compareContent,
  compareUniqueStudentByEmail,
  compareUniqueSyllabusDenominationOnEachGrade,
  syllabusContent,
  studentsContent,
} = require('../../../tasks/Suministrar Información necesaria para el proceso/01IniciarProcesoForm');

describe('Tests inside 01IniciarProcesoForm.js file', () => {
  let resultStudents = [];
  let resultSyllabuses = [];
  beforeEach(() => {
    resultStudents = [
      ['Nombres', 'Apellidos', 'Ciclo', 'Paralelo', 'Correo', 'Nota'],
      ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon@unl.edu.ec', '9.99'],
      ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon1@unl.edu.ec', '9.99'],
      ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon2@unl.edu.ec', '9.99'],
      ['Jean Carlos', 'Alarcón Ochoa', '10', 'A', 'jean.alarcon3@unl.edu.ec', '9.99'],
      ['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'edgar.soto@unl.edu.ec', '9.99'],
      ['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'edgar.soto1@unl.edu.ec', '9.99'],
    ];

    resultSyllabuses = [
      ['Denominacion', 'Docente', 'Ciclo', 'Paralelo'],
      ['Ingeniería de Software 1', 'Oscar Cumbicus', 10, 'B'],
      ['Contabilidad', 'César Fernando Iñiguez Pineda', 10, 'B'],
      ['Control Automatizado Asistido por computador', 'César Fernando Iñiguez Pineda', 10, 'A'],
      ['Sistemas Expertos', 'Oscar Cumbicus', 10, 'A'],
      ['Ingeniería de Software 1', 'Oscar Cumbicus', 10, 'A'],
      ['Contabilidad', 'César Fernando Iñiguez Pineda', 10, 'A'],
      ['Control Automatizado Asistido por computador', 'César Fernando Iñiguez Pineda', 10, 'B'],
      ['Sistemas Expertos', 'Oscar Cumbicus', 10, 'B'],
      ['Ingeniería de Software', 'César Fernando Iñiguez Pineda', 10, 'B'],
      ['Ingeniería de Software', 'César Fernando Iñiguez Pineda', 10, 'A'],
    ];
  });

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

  describe('Cases inside compareSizeContent method', () => {
    test('When Students CSV file is correctly entered, should return true', () => {
      const isSizeContentCorrect = compareSizeContent(resultStudents);

      expect(isSizeContentCorrect).toBe(true);
    });

    test('When Students CSV file is correctly entered but with empty array in one row, should return true', () => {
      resultStudents.push(['']);

      const isSizeContentCorrect = compareSizeContent(resultStudents);

      expect(isSizeContentCorrect).toBe(true);
    });

    test('When Students CSV file is incorrectly entered (One field more on any row), should return false', () => {
      resultStudents.push(['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'nomatter@unl.edu.ec', '9.99', 'OTRO VALOR']);

      const isSizeContentCorrect = compareSizeContent(resultStudents);

      expect(isSizeContentCorrect).toBe(false);
    });

    test('When Students CSV file is incorrectly entered (One field less on any row), should return false', () => {
      resultStudents.push(['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'nomatter@unl.edu.ec']);

      const isSizeContentCorrect = compareSizeContent(resultStudents);

      expect(isSizeContentCorrect).toBe(false);
    });
  });

  describe('Cases inside compareContent method', () => {
    test('When on any row at 4 position contains a email without UNL domain, should return false', () => {
      resultStudents.push(['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'nomatter@gmail.com', '9.99']);

      const isContentCorrect = compareContent(resultStudents);

      expect(isContentCorrect).toBe(false);
    });

    test('When on any row at position 2 contains a grade number not accepted, should return false', () => {
      const unAcceptedGradeNumber = '12';
      resultStudents.push(['Edgar Andŕes', 'Soto Rodriguez', unAcceptedGradeNumber, 'B', 'nomatter@gmail.com', '9.99']);
      const isContentCorrect = compareContent(resultStudents);

      expect(isContentCorrect).toBe(false);
    });

    test('When on any row at position 3 contains a grade parallel not accepted, should return false', () => {
      const unAcceptedGradeParallel = 'H';
      resultStudents.push(['Edgar Andŕes', 'Soto Rodriguez', '12', unAcceptedGradeParallel, 'nomatter@gmail.com', '9.99']);
      const isContentCorrect = compareContent(resultStudents);

      expect(isContentCorrect).toBe(false);
    });

    test('When all information is correct, should return true', () => {
      const isContentCorrect = compareContent(resultStudents);

      expect(isContentCorrect).toBe(true);
    });
  });

  describe('Cases inside compareUniqueStudentByEmail method', () => {
    test('When two rows or more contains the same email at position 4, should retun false', () => {
      resultStudents.push(['Edgar Andŕes', 'Soto Rodriguez', '10', 'B', 'jean.alarcon3@unl.edu.ec', '9.99']);

      const areAllStudentsUnique = compareUniqueStudentByEmail(resultStudents);

      expect(areAllStudentsUnique).toBe(false);
    });

    test('When in all rows the email is different, should return true', () => {
      const areAllStudentsUnique = compareUniqueStudentByEmail(resultStudents);

      expect(areAllStudentsUnique).toBe(true);
    });
  });

  describe('Cases inside compareUniqueSyllabusDenominationOnEachGrade method', () => {
    let syllabuses = [];

    beforeEach(() => {
      syllabuses = [
        ['Denominacion', 'Docente', 'Ciclo', 'Paralelo'],
        ['Ingeniería de Software 1', 'Oscar Cumbicus', 10, 'B'],
        ['Contabilidad', 'César Fernando Iñiguez Pineda', 10, 'B'],
        ['Control Automatizado Asistido por computador', 'César Fernando Iñiguez Pineda', 10, 'A'],
        ['Sistemas Expertos', 'Oscar Cumbicus', 10, 'A'],
        ['Ingeniería de Software 1', 'Oscar Cumbicus', 10, 'A'],
        ['Contabilidad', 'César Fernando Iñiguez Pineda', 10, 'A'],
        ['Control Automatizado Asistido por computador', 'César Fernando Iñiguez Pineda', 10, 'B'],
        ['Sistemas Expertos', 'Oscar Cumbicus', 10, 'B'],
        ['Ingeniería de Software', 'César Fernando Iñiguez Pineda', 10, 'B'],
        ['Ingeniería de Software', 'César Fernando Iñiguez Pineda', 10, 'A'],
      ];
    });

    test('When same denomination syllabuses repeat in the same grade, should return false', () => {
      syllabuses.push(['Ingeniería de Software', 'César Fernando Iñiguez Pineda', 10, 'A']);

      const isSyllabusCorrect = compareUniqueSyllabusDenominationOnEachGrade(syllabuses);

      expect(isSyllabusCorrect).toBe(false);
    });

    test('When denomination syllabus are unique in the same grade, should return true', () => {
      const isSyllabusCorrect = compareUniqueSyllabusDenominationOnEachGrade(syllabuses);

      expect(isSyllabusCorrect).toBe(true);
    });
  });

  describe('Cases inside syllabusContent method', () => {
    test('When provided correctly syllabusFile, should return an order syllabuses array', () => {
      const firstGrade = {
        grade: 10,
        parallel: 'A',
      };

      const secondGrade = {
        grade: 10,
        parallel: 'B',
      };

      const [syllabusesToShow] = syllabusContent(resultSyllabuses);

      for (let index = 0; index < syllabusesToShow.length; index += 1) {
        if (index < syllabusesToShow.length / 2) {
          expect(syllabusesToShow[index].cicle).toBe(firstGrade.grade);
          expect(syllabusesToShow[index].parallel).toBe(firstGrade.parallel);
        } else {
          expect(syllabusesToShow[index].cicle).toBe(secondGrade.grade);
          expect(syllabusesToShow[index].parallel).toBe(secondGrade.parallel);
        }
      }
    });
  });

  describe('Cases inside studentsContent method', () => {
    test('When provided correctly studentsFile, should return an order students array', () => {
      const firstGrade = {
        grade: 10,
        parallel: 'A',
      };

      const secondGrade = {
        grade: 10,
        parallel: 'B',
      };

      const [studentsToShow] = studentsContent(resultStudents);

      for (let index = 0; index < studentsToShow.length; index += 1) {
        if (index < 4) {
          expect(studentsToShow[index].cicle).toBe(firstGrade.grade);
          expect(studentsToShow[index].parallel).toBe(firstGrade.parallel);
        } else {
          expect(studentsToShow[index].cicle).toBe(secondGrade.grade);
          expect(studentsToShow[index].parallel).toBe(secondGrade.parallel);
        }
      }
    });
  });
});
