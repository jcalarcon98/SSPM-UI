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

module.exports = {
  areDatesWrong,
  getGrades,
  isManagerEmailIncorrect,
  verifyCorrectRate,
};
