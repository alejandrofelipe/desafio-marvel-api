module.exports = {
	notFound(req, res) {
		res.status(404)
			.send({status: 'not found'});
	}
}