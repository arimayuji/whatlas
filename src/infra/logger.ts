import { FastifyBaseLogger } from 'fastify'

let _logger: FastifyBaseLogger

export const setLogger = (loggerInstance: FastifyBaseLogger) => {
  _logger = loggerInstance
}

export const logger = {
  info: (msg: string, meta?: object) => _logger?.info(meta || {}, msg),
  error: (msg: string, meta?: object) => _logger?.error(meta || {}, msg),
  warn: (msg: string, meta?: object) => _logger?.warn(meta || {}, msg),
}
