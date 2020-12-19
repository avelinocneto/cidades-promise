class CidadesPromiseError extends Error {
    constructor({ message, type, error } = {}) {
        super()

        this.name = 'CidadesPromiseError'
        this.message = message
        this.type = type
        this.error = error
    }
}

module.exports = CidadesPromiseError
