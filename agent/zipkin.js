const {
  Tracer,
  BatchRecorder,
  ExplicitContext,
  jsonEncoder: { JSON_V2 }
} = require('zipkin');

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const CLSContext = require('zipkin-context-cls');
const localServiceName = 'express-frontend'; 

const { HttpLogger } = require('zipkin-transport-http');



module.exports = (localServiceName) => {
  const tracer = new Tracer({
    ctxImpl: new CLSContext('zipkin'),
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: 'http://localhost:9411/api/v2/spans',
        jsonEncoder: JSON_V2
      })
    }),
    localServiceName,
  });
  
  return {
    middleware: () => zipkinMiddleware({ tracer }),
  }
} 
