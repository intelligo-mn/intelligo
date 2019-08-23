const SERVICE_IDENTIFIER = {
  LOGGER: Symbol.for('Logger'),
  METRICS: Symbol.for('Metrics'),
  SECURITY: Symbol.for('Security'),
  EXAMPLE: Symbol.for('Example'),
  HYSTRIX: Symbol.for('Hystrix'),
  STARWARS: Symbol.for('Starwars'),
  PRODUCT: Symbol.for('Product'),
  USER: Symbol.for('User'),
  SCRAPER: Symbol.for('Scraper'),
  LOGGER_MIDDLEWARE: Symbol.for('LoggerMiddleware')
};

export default SERVICE_IDENTIFIER;
