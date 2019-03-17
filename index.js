const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

app.get("*", (req, res) => {
  console.log('dick');
  res.send('KOpzpLPfaDQKv9S8-YR3HrJAKRZdx4MNlup_mHwMRtY.gEOVzr172mYkmCiwzRjAGd_rrxPjzSPa-bR5Gek6BIk');
});

app.listen(app.get("port"), () => {
  console.log(`server running at port ${app.get("port")}`);
});