import jwt from 'jsonwebtoken'

// generate token based on user id
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken