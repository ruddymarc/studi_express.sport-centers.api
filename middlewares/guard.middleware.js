module.exports = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1]
  if (!token) {
    res.statusCode = 400
    return next('Unauthorized request')
  }

  req.app.get('models').User
    .findOne({ token })
    .then(({ role }) => {
      req.role = role
      next()
    })
    .catch((_error) => {
      res.statusCode = 401
      next('You are not logged in !') }
    )
}