"use strict";
const _serviceName = "service-green";

const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/node");
const {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} = require("@opentelemetry/tracing");

// To test export to jaeger
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

const provider = new NodeTracerProvider();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Enable jaeger exporter
const options = {
  serviceName: _serviceName,
};
const jaegerExporter = new JaegerExporter(options);
provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
provider.register();

module.exports.getTracer = (name) => {
  return opentelemetry.trace.getTracer(name);
};
