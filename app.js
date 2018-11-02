// // const zipkin = require('./agent/zipkin')('service-green');
const initTracer = require('jaeger-client').initTracer;

const PrometheusMetricsFactory = require('jaeger-client').PrometheusMetricsFactory;
const promClient = require('prom-client');

const config = {
  serviceName: 'service_green',
};
const namespace = config.serviceName;
const metrics = new PrometheusMetricsFactory(promClient, namespace);
const options = {
  tags: {
    'service-green.version': '1.0.1',
  },
  metrics,
  // logger: logger,
};
const tracer = initTracer(config, options);

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
mongoose.connect('mongodb://localhost:27017/votings');
const app = express();

// app.use(zipkin.middleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
