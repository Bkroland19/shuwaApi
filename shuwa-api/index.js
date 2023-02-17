const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const userController = require("./controllers/userController");
const ladyController = require("./controllers/ladyController");
const adminController = require("./controllers/adminController");
const {
	handleError,
	requireAdminAuth,
	parseBody,
} = require("./middlewares/adminMiddlewares");
const { requireAuth } = require("./middlewares/middlewares");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/hookup", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Set up middleware
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// Set up routes for regular users
app.post("/api/users", parseBody, userController.create);
app.post("/api/users/login", parseBody, userController.login);
// app.post("/api/ladies", requireAuth, parseBody, ladyController.create);
// app.put("/api/ladies/:id", requireAuth, parseBody, ladyController.update);
// app.delete("/api/ladies/:id", requireAuth, ladyController.delete);

// Set up routes for admin users
app.post("/api/admins",  adminController.create);
app.post("/api/admins/login",  adminController.login);
app.post(
	"/api/admins/ladies",
	requireAdminAuth,
	parseBody,
	ladyController.create
);
app.put(
	"/api/admins/ladies/:id",
	requireAdminAuth,
	parseBody,
	ladyController.update
);
app.delete("/api/admins/ladies/:id", requireAdminAuth, ladyController.delete);

// Set up error handling middleware
app.use(handleError);

// Start the server
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
