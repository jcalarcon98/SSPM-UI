/**
 * @file all methods used inside Form 01IniciarProcesoForm for the Task
 * 'Suministrar información necesaria para el proceso.'
 * @author Jean Carlos Alarcón <jeancalarcon98@gmail.com>
 * @author Edgar Andrés Soto <edgar.soto@unl.edu.ec>
 */

/**
 * Function to verify if the endDate of the period is greater than the period initDate
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

module.exports = {
  areDatesWrong,
};
