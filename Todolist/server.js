require("dotenv").config();
const app = require("./app");

// connect database
const dbConnect = require("./configs/db.config");
dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server runnig on port ${PORT}`);
});
