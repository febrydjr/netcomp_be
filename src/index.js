require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const {
  adminRouter,
  authRouter,
  userOrderRouter,
  rajaongkirRouter,
  userProfileRouter,
  reportRouter,
  warehouseRouter,
  transactionRouter,
  addressRouter,
  productRouter,
  stockRouter,
} = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

app.use(cors());
app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/api/order", userOrderRouter);
app.use("/api/auth", authRouter);
app.use("/api/rajaongkir", rajaongkirRouter);
app.use("/api/user", userProfileRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/address", addressRouter);
app.use("/api/product", productRouter);
app.use("/api/report", reportRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/stock", stockRouter);

if (__dirname.split("/").includes("www")) {
  app.use(
    "/api/public",
    express.static(path.resolve(__dirname, "../../../public"))
  );
} else {
  app.use("/api/public", express.static(path.resolve(__dirname, "../public")));
}
// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Route Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
