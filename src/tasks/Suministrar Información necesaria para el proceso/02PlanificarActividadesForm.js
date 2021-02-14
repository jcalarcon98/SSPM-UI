/**
 * Verify if there are at least two alternatives
 * @param  {Object[]} alternatives - Alternatives array.
 * @returns {Object} if there are at least two alternatives return a parameter with true.
 */
function verifyIfExistMoreThanTwoAlternatives(alternatives) {
  if (alternatives.length <= 1) {
    const alternativeError = 'Debe ingresar al menos dos alternativas';

    return {
      isIncorrect: true,
      errorMessage: alternativeError,
    };
  }

  return {
    isIncorrect: false,
  };
}

/**
 * Verify if there are at least two indicators
 * @param  {Object[]} indicators - Indicators array.
 * @returns {Object} if there are at least two indicators return a parameter with true.
 */
function verifyIfExistMoreThanOneIndicators(indicators) {
  if (indicators.length <= 0) {
    const halfStageError = 'Debe ingresar al menos un indicador en la ficha de final de ciclo';

    return {
      isIncorrect: true,
      errorMessage: halfStageError,
    };
  }

  return {
    isIncorrect: false,
  };
}

module.exports = {
  verifyIfExistMoreThanTwoAlternatives,
  verifyIfExistMoreThanOneIndicators,
};
