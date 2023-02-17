const handleError = (err, res, req, next) => {
	console.log(err.stack);

	res.status(500).json({ error: "Something went wrong" });
};

const parseBody = (req, res, next) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		req.body = JSON.parse(body);
		next();
	});
};

const requireAdminAuth = (req, res, next) => {
	if (req.session && req.session.isAdmin) {
		console.log("authorized admin");
		next();
	} else {
		res.status(401).json({ error: "Unauthorized" });
	}
};

module.exports = {
	handleError,
	parseBody,
	requireAdminAuth,
};
