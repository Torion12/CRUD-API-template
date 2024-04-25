const {constants} = require("../constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed ",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "NOT FOUND ",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED ",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN ",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR ",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("Success");
      break;
  }
};

module.exports = errorHandler;
