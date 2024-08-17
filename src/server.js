require("express-async-errors");
const express = require("express");

const app = express();
const routes = require("./routes");
const AppError = require("./utils/AppError");

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    response.status(error.statusCode).json({
      "status": "error",
      "message": error.message 
    });
  }

  console.error(error);

  response.status(500).json({
    "status": "error",
    "message": "Internal Server Error"
  })
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

