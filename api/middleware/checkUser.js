const { findByUserName } = require('../auth/auth-model')

const checkCred = (req, res, next) => {
  let creds = req.body
  if (!creds.username || !creds.password) {
    res.status(400).json({
      message: 'username and password required'
    })
  }
  findByUserName(req.body.username)
  .then((user) => {
    if (!user) {
      next()
    } else {
      res.status(401).json('username taken')
    }
  })
  .catch(next)
}

module.exports = {
  checkCred
}