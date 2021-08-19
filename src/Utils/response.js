const response = (res, code, message, data = null) => {
  code = String(code);

  if (code.startsWith("2")) {
    return res.status(code).json({
      status: "Success",
      message,
      data,
    });
  } else if (code.startsWith("4")) {
    return res.status(code).json({
      status: "Failure",
      message,
      error: data,
    });
  } else if (code.startsWith("5")) {
    return res.status(code).json({
      status: "Failure",
      message: data.message,
      error: data,
    });
  }
};

export default response;