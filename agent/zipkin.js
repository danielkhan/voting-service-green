const {
  Tracer,
  BatchRecorder,
  ExplicitContext,
  jsonEncoder: { JSON_V2 }
} = require('zipkin');

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const wrapRequest = require('zipkin-instrumentation-request');
const request = require('request');
const CLSContext = require('zipkin-context-cls');
const localServiceName = 'express-frontend'; 

// const CLSContext = require('zipkin-context-cls');
const { HttpLogger } = require('zipkin-transport-http');

// Setup the tracer to use http and implicit trace context
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

module.exports = (localServiceName) => {
  return {
    middleware: () => zipkinMiddleware({ tracer }),
    request: (remoteServiceName) => wrapRequest(request, { tracer, remoteServiceName }),
  }
} 
