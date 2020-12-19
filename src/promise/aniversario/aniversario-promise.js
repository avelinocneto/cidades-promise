const CidadesPromiseError = require('../../errors/cidades-promise')
const { getAllCityBirthday, getCityBirthdayByPeriod } = require('../../service/aniversario')
const Promise = require('../../utils/promise-any')

function getCityBirthday(dayFrom = null, monthFrom = null, dayTo = null, monthTo = null) {

    if (dayFrom === null && monthFrom === null && dayTo === null && monthTo === null) {

        return Promise.resolve(data)
            .then(() => {
                return getAllCityBirthday()
            })

    } else {

        return Promise.resolve(data)
            .then(validateDataObject)
            .then(validateTypes)
            .then(validateLengths)
            .then(validateCalendar)
            .then(async (data) => {
                const { dayFrom, monthFrom, dayTo, monthTo } = data;
                return await getCityBirthdayByPeriod(dayFrom, monthFrom, dayTo, monthTo)
            })
            .catch(error => {
                throw error;
            });

    }
}

function validateDataObject(data) {
    if (data.dayFrom && data.monthFrom && data.dayTo && data.monthTo)
        return data;

    const message = 'Dia e Mês iniciais e finais devem ser informados. Para calcular um único dia, repita o parametro.'
    const error_message = 'Dia e Mês iniciais e finais não foram informados.'
    throwError(message, error_message)
}

function validateTypes(data) {
    if ((typeof data.dayFrom === 'string' || data.dayFrom instanceof String)
        && (typeof data.monthFrom === 'string' || data.monthFrom instanceof String)
        && (typeof data.dayTo === 'string' || data.dayTo instanceof String)
        && (typeof data.monthTo === 'string' || data.monthTo instanceof String))
        return data;

    const message = 'Dia e Mês devem ser uma string'
    const error_message = 'Dia e Mês informados não são uma string.'
    throwError(message, error_message)
}

function validateLengths(data) {
    if (data.dayFrom.length >= 1 && data.dayFrom.length <= 2
        && data.monthFrom.length >= 1 && data.monthFrom.length <= 2
        && data.dayTo.length >= 1 && data.dayTo.length <= 2
        && data.monthTo.length >= 1 && data.monthTo.length <= 2)
        return data;

    const message = 'Dia e mês devem ter 1 ou 2 dígitos (Ex.: 1 ou 01)'
    const error_message = 'Dia e mês informados não posuem 1 ou 2 dígitos (Ex.: 1 ou 01).'
    throwError(message, error_message);
}

function validateCalendar(data) {
    var today = new Date();
    var currentYear = today.getFullYear();

    if ((data.monthFrom >= 1 && data.monthFrom <= 12)
        || (data.monthTo >= 1 && data.monthTo <= 12)) {

        var lastDayOfMonthFrom = new Date(currentYear, data.monthFrom, 0);
        if (data.dayFrom <= 1 && data.dayFrom >= lastDayOfMonthFrom) { //TODO
            const message = 'Dia e mês devem ter 1 ou 2 dígitos (Ex.: 1 ou 01)'
            const error_message = 'Dia e mês informados não posuem 1 ou 2 dígitos (Ex.: 1 ou 01).'
            throwError(message, error_message);
        }

        var lastDayOfMonthTo = new Date(currentYear, data.monthTo, 0);
        if (data.dayTo <= 1 && data.dayTo >= lastDayOfMonthTo) { //TODO
            const message = 'Dia e mês devem ter 1 ou 2 dígitos (Ex.: 1 ou 01)'
            const error_message = 'Dia e mês informados não posuem 1 ou 2 dígitos (Ex.: 1 ou 01).'
            throwError(message, error_message);
        }

        return data;

    } else {
        const message = 'Dia e mês devem ter 1 ou 2 dígitos (Ex.: 1 ou 01)'
        const error_message = 'Dia e mês informados não posuem 1 ou 2 dígitos (Ex.: 1 ou 01).'
        throwError(message, error_message);
    }



}

function throwError(message, error_message) {
    throw new CidadesPromiseError({
        message: message,
        type: 'validation_error',
        error: {
            message: error_message,
            service: 'cidade_validation'
        }
    })
}



module.exports = getAirport