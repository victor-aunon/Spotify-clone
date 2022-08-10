const app = require("./index");

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening at port ${process.env.PORT || 3000}`)
);