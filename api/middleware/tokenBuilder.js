const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')

function tokenBuilder(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name
  }
  const config = {
    expiresIn: '1d'
  }
  return jwt(payload, JWT_SECRET, config)
}

module.exports = {
  tokenBuilder
}