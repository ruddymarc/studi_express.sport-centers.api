module.exports = (req, res, next) => {
  const { method, url } = req
  if (method !== 'GET' || url !== '/') {
    return next()
  }
  res.render('index', { title: 'Express' })
}