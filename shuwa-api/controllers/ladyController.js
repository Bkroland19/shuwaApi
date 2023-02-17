const Lady = require("../models/lady");

exports.create = async (req, res, next) => {
	if (!req.session.isAdmin) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const lady = new Lady(req.body);
		const newLady = await lady.save();
		res.json(newLady);
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	if (!req.session.isAdmin) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const { id } = req.params;
		const updatedLady = await Lady.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedLady) {
			return res.status(404).json({ error: "Lady not found" });
		}
		res.json(updatedLady);
	} catch (error) {
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	if (!req.session.isAdmin) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const { id } = req.params;
		const deletedLady = await Lady.findByIdAndDelete(id);
		if (!deletedLady) {
			return res.status(404).json({ error: "Lady not found" });
		}
		res.json(deletedLady);
	} catch (error) {
		next(error);
	}
};
