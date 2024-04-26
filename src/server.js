const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const Host = "localhost";
const PORT = 5000;

app.use(cors("/"));
app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://${Host}:${PORT}`);
});
