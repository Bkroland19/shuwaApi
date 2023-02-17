const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

exports.create = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const admin = new Admin({ email, password: hashedPassword });
		const newAdmin = await admin.save();
		res.json(newAdmin);
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	const admin = await Admin.findOne({ email });

	if (!admin) {
		return res.status(404).json({ error: "Admin not found" });
	}

	const passwordMatches = await bcrypt.compare(password, admin.password);

	if (!passwordMatches) {
		return res.status(401).json({ error: "Passwords do not match" });
	}

	req.session.isAdmin = true;

	res.json({ message: "Logged in successfully" });
};
