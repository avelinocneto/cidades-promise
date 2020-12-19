const CidadesPromiseError = require('../../errors/cidades-promise')
const axios = require('axios')

async function getAllCityBirthday() {
    return getCityBirthdayByPeriod(01, 01, 31, 12);
}

async function getCityBirthdayByDate(day, month) {
    return getCityBirthdayByPeriod(day, month, day, month);
}

async function getCityBirthdayByPeriod(dayFrom, monthFrom, dayTo, monthTo) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/aniversarios/0?diade=${dayFrom}&mesde=${monthFrom}&diaate=${dayTo}&mesate=${monthTo}`

    try {
        return await axios.get(url)
    } catch (error) {
        let { status } = error.response
        const message = status === 404 ? 'Não existem cidades aniversariantes para o período informado'
            : 'Erro interno da API'
        const error_message = status === 404 ? 'Não foi possível encontrar cidades aniversariantes para o período informado.'
            : 'O serviço retornou um erro.'

        throw new CidadesPromiseError({
            message: message,
            type: 'service_error',
            error: {
                message: error_message,
                service: 'cidades_api'
            }
        })
    }
}

module.exports.getCityBirthdayByPeriod = getCityBirthdayByPeriod;
module.exports.getAllCityBirthday = getAllCityBirthday;
