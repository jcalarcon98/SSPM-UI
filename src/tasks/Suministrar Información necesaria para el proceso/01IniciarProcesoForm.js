/**
 * @file all methods used inside Form 01IniciarProcesoForm for the Task
 * 'Suministrar información necesaria para el proceso.'
 * @author Jean Carlos Alarcón <jeancalarcon98@gmail.com>
 * @author Edgar Andrés Soto <edgar.soto@unl.edu.ec>
 */
const _ = require('underscore');
/**
 * Function to verify if the endDate of the period is greater than the period initDate
 * Variable in UI Designer - <b>areDatesWrong</b>
 * @param  {Date} initDate - The start date of the period.
 * @param  {Date} endDate - The end date of the period.
 * @returns {boolean} - If endDate is greater than initDate should return false, else true
 */
function areDatesWrong(initDate, endDate) {
  if (initDate && endDate) {
    if (Date.parse(initDate) >= Date.parse(endDate)) {
      return true;
    }
  }
  return false;
}
/**
 * Get all grades inside CSV file.
 * Variable in UI Designer - <b>grades</b>
 * @param  {boolean} isStudentsCsvInvalid - Indicates if the Students CSV is Invalid.
 * @param  {Object[]} resultStudents - Students array inside CSV file.
 * @returns {null|Object[]} - Grades passed on the CSV file.
 */
function getGrades(isStudentsCsvInvalid, resultStudents) {
  if (isStudentsCsvInvalid === true || !resultStudents) {
    return null;
  }

  const grades = [];

  let results = resultStudents;

  results = results.filter((result) => result[0] !== '');

  for (let init = 1; init < results.length; init += 1) {
    const currentGrade = {
      persistenceId_string: '',
      number: parseInt(results[init][2], 5),
      parallel: results[init][3],
      students: [],
      syllabuses: [],
    };

    const currentStudent = {
      persistenceId_string: '',
      name: results[init][0],
      lastName: results[init][1],
      email: results[init][4],
      rate: parseFloat(results[init][5]),
    };

    if (!grades.some((compareGrade) => compareGrade.number === currentGrade.number
      && compareGrade.parallel === currentGrade.parallel)) {
      currentGrade.students.push(currentStudent);
      grades.push(currentGrade);
    } else {
      const grade = grades.find((gradeInline) => gradeInline.number === currentGrade.number
        && gradeInline.parallel === currentGrade.parallel);
      grade.students.push(currentStudent);
    }
  }

  return grades;
}
/**
 * Verify if manager email contains unl domain.
 * Variable in UI Designer - <b>isManagerEmailIncorrect</b>
 * @param  {string} managerEmail - Institutional email of the degree manager.
 * @returns {boolean} - if manager email does not contains unl domain returns true else false;
 */
function isManagerEmailIncorrect(managerEmail) {
  if (managerEmail.length > 10) {
    const unlDomain = '@unl.edu.ec';

    const catchDomainOnManagerEmail = managerEmail.substr(managerEmail.length - unlDomain.length);

    return catchDomainOnManagerEmail !== unlDomain;
  }

  return false;
}
/**
 * Verify if the student rate is a valid number.
 * Variable in UI Designer - <b>isStudentsCsvInvalid</b>
 * @param  {number} rate
 * @returns {boolean} if rate is a valid number returns true else false.
 */
function verifyCorrectRate(rate) {
  if (!rate) {
    return false;
  }

  const currentRate = Number(rate);

  return !Number.isNaN(currentRate);
}
/**
 * Verify if each row inside Students CSV file contains only the amount of required parameters(6)
 * Variable in UI Designer - <b>isStudentsCsvInvalid</b>
 * @param  {Object[]} array - Results of CSV file
 * @returns {boolean} if any row contains more or less parameters should return false else true
 */
function compareSizeContent(array) {
  const parametersSize = 6;

  let isCorrect = true;
  for (let init = 0; init < array.length; init += 1) {
    const currentArray = array[init];
    if (currentArray.length !== 1 && currentArray.length !== parametersSize) {
      isCorrect = false;
      return isCorrect;
    }

    if (currentArray.length === 1) {
      const [element] = currentArray;
      if (element !== '') {
        isCorrect = false;
        return isCorrect;
      }
    }
  }
  return isCorrect;
}
/**
 * Verify if each row inside Students CSV file contains the required parameters.
 * Variable in UI Designer - <b>isStudentsCsvInvalid</b>
 * @param {String[]} array
 * @param {string} array[].firstParameterInArray - Student last names
 * @param {string} array[].secondParameterInArray - Student names
 * @param {string} array[].thirdParameterInArray - Student grade number, permited numbers [1..10]
 * @param {string} array[].fourthParametserInArray - Student grade parallel,
 * permited parallels [A,..D]
 * @param {string} array[].fifthParameterInArray - Student email
 * @param {string} array[].sixthParameterInArray - Student rate
 * @returns {boolean} if all information is correct return true else false.
 */
function compareContent(array) {
  const unlDomain = '@unl.edu.ec';
  const permitedGrades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const permitedParallels = ['A', 'B', 'C', 'D'];

  for (let init = 1; init < array.length; init += 1) {
    const currentArray = array[init];
    const currentGrade = currentArray[2];
    const currentParallel = currentArray[3];
    const currentEmail = currentArray[4];
    const currentRate = currentArray[5];

    const unlDomainSize = currentEmail.length - unlDomain.length;
    const catchUnlDomainOnCurrentEmail = currentEmail.substr(unlDomainSize);

    if (catchUnlDomainOnCurrentEmail !== unlDomain) {
      return false;
    }
    if (!permitedGrades.includes(currentGrade)) {
      return false;
    }

    if (!permitedParallels.includes(currentParallel)) {
      return false;
    }

    if (!verifyCorrectRate(currentRate)) {
      return false;
    }
  }
  return true;
}
/**
 * Verify if in all rows the same email does not repeat.
 * Variable in UI Designer - <b>isStudentsCsvInvalid</b>
 * @param  {Object[]} array - Results of Students CSV file
 * @returns {boolean}  if student email doesn't repeat en each row returns true else fasle.
 */
function compareUniqueStudentByEmail(array) {
  const isCorrect = true;

  const emailDefaultPosition = 4;

  for (let init = 1; init < array.length; init += 1) {
    const correo = array[init][emailDefaultPosition];

    for (let initInside = 1; initInside < array.length; initInside += 1) {
      if (init !== initInside) {
        const correoInside = array[initInside][emailDefaultPosition];

        if (correo === correoInside) {
          return false;
        }
      }
    }
  }
  return isCorrect;
}
/**
 * Verify if in the same grade inside Syllabus CSV file the syllabus denomination doesn't repeat
 * Variable in UI Designer - <b>isSyllabusCsvInvalid</b>
 * @param  {Object} array - Results of Syllabus CSV file
 * @returns {boolean} if syllabus denomination doesn't repeat in the same grade
 * returns true else false.
 */
function compareUniqueSyllabusDenominationOnEachGrade(array) {
  const isCorrect = true;

  for (let init = 1; init < array.length; init += 1) {
    const [denomination, , cicle, parallel] = array[init];

    for (let initInside = 0; initInside < array.length; initInside += 1) {
      if (init !== initInside) {
        const [denominationInside, , cicleInside, parallelInside] = array[initInside];

        const areDenominationEqual = denomination === denominationInside;
        const areCicleEqual = cicle === cicleInside;
        const areParallelEqual = parallel === parallelInside;

        if (areDenominationEqual && areCicleEqual && areParallelEqual) {
          return false;
        }
      }
    }
  }
  return isCorrect;
}
/**
 * Order correctly the grades for the purpose to show these grades.
 * Variable in UI Designer - <b>syllabusContent</b>
 * @param  {Object[]} array - Results of Syllabus CSV file.
 * @retuns {Object[]} array - Results of syllabus CSV file ordered.
 */
function syllabusContent(array) {
  let sillabusToShow = [];
  let results = array;

  results = results.filter((result) => result[0] !== '');

  for (let init = 1; init < results.length; init += 1) {
    const currentSillabusShow = {
      name: results[init][0],
      teacher: results[init][1],
      cicle: parseInt(results[init][2], 10),
      parallel: results[init][3],
    };

    sillabusToShow.push(currentSillabusShow);
  }

  const finalArray = [];

  const sortedSillabusByGrade = _.sortBy(sillabusToShow, 'cicle');

  let { cicle: initGrade } = sortedSillabusByGrade[0];

  let initArray = [];

  for (let init = 0; init < sortedSillabusByGrade.length; init += 1) {
    const { cicle: currentGrade } = sortedSillabusByGrade[init];

    if (currentGrade !== initGrade) {
      initArray = _.sortBy(initArray, 'parallel');
      finalArray.push(initArray);

      initGrade = currentGrade;

      initArray = [];

      initArray.push(sortedSillabusByGrade[init]);
    } else {
      initArray.push(sortedSillabusByGrade[init]);
    }

    if (init + 1 === sortedSillabusByGrade.length) {
      initArray = _.sortBy(initArray, 'parallel');
      finalArray.push(initArray);
    }
  }
  sillabusToShow = [...finalArray];

  return sillabusToShow;
}
/**
 * Order correctly the students fot the purpose to show these students
 * Variable in UI Designer - <b>studentsContent</b>
 * @param  {Object[]} array - Results of students CSV file
 * @returns {Object[]} array - Results of students csv file ordered.
 */
function studentsContent(array) {
  let studentsShow = [];
  let results = array;

  results = results.filter((result) => result[0] !== '');

  for (let init = 1; init < results.length; init += 1) {
    const currentStudentShow = {
      name: results[init][0],
      lastName: results[init][1],
      cicle: parseInt(results[init][2], 10),
      parallel: results[init][3],
      email: results[init][4],
      rate: results[init][5],
    };

    studentsShow.push(currentStudentShow);
  }

  const finalArray = [];

  const sortedStudentsByGrade = _.sortBy(studentsShow, 'cicle');

  let { cicle: initGrade } = sortedStudentsByGrade[0];

  let initArray = [];

  for (let init = 0; init < sortedStudentsByGrade.length; init += 1) {
    const { cicle: currentGradeShow } = sortedStudentsByGrade[init];

    if (currentGradeShow !== initGrade) {
      initArray = _.sortBy(initArray, 'parallel');

      finalArray.push(initArray);

      initGrade = currentGradeShow;

      initArray = [];

      initArray.push(sortedStudentsByGrade[init]);
    } else {
      initArray.push(sortedStudentsByGrade[init]);
    }

    if (init + 1 === sortedStudentsByGrade.length) {
      initArray = _.sortBy(initArray, 'parallel');
      finalArray.push(initArray);
    }
  }

  studentsShow = finalArray;
  return studentsShow;
}
/**
 * Verifies that there are the required number of students for each cycle.
 * Variable in UI Designer - <b>updateGrades</b>
 * Always for each cycle there must be 3 more students than the number of syllabuses.
 * @param  {Object[]} grades - Grades of current degree.
 * @returns { boolean | Object } -> If everything is correct return true else,
 * return an object with message anf false.
 */
function areEnoughStudentsToRateSyllabus(grades) {
  const amountOfAdditionalStudentsPerGrade = 3;
  let areWrongParallels = false;

  let wrongParallels = '';

  for (const grade of grades) {
    if (grade.students.length !== (grade.syllabuses.length + amountOfAdditionalStudentsPerGrade)) {
      areWrongParallels = true;
      wrongParallels += `Ciclo: ${grade.number} Paralelo: "${grade.parallel}" \n`;
    }
  }

  if (areWrongParallels) {
    return {
      isCorrect: false,
      message: `<b>Error</b>: Asegurese que exista 3 estudiantes más que la cantidad de sílabos por cada ciclo\n
      Los siguientes ciclos no cumplen esa característica:\n
      ${wrongParallels}`,
    };
  }

  return true;
}

/**
 * Update grades with syllabuses with the corresponding syllabuses.
 * Variable in UI Designer - <b>updateGrades</b>
 * @param {Object[]} grades - Grades of current degree.
 * @param {string[]} resultSyllabuses - Results Syllabus CSV File.
 * @returns {Object[]} updatedGrades with that syllabuses.
 */
function updateGrades(grades, resultSyllabuses) {
  const updatedGrades = grades;
  const results = resultSyllabuses.filter((result) => result[0] !== '');

  for (let init = 1; init < results.length; init += 1) {
    const currentGradeNumber = parseInt(results[init][2], 10);
    const currentParallel = results[init][3];

    const currentSillabus = {
      persistenceId_string: '',
      denomination: results[init][0],
      teacher: {
        name: results[init][1],
      },
    };

    for (let iteratorGrade = 0; iteratorGrade < updatedGrades.length; iteratorGrade += 1) {
      const grade = updatedGrades[iteratorGrade];
      /**
       * If the syllabus row contains the same parallel and the same number grade, it will
       * push to syllabus inside that grade.
       */
      if (grade.number === currentGradeNumber && grade.parallel === currentParallel) {
        grade.syllabuses.push(currentSillabus);
      }
    }
  }

  return updatedGrades;
}

module.exports = {
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
  areEnoughStudentsToRateSyllabus,
  updateGrades,
};
