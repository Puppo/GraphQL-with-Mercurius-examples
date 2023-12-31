const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  },
  production: true,
  test: true
} as const

function getLoggerOptions(env: keyof typeof envToLogger) {
  return envToLogger[env]
}

export default getLoggerOptions(process.env.NODE_ENV as keyof typeof envToLogger)
