const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const AUTH_MISSING_CREDENTIALS = 'AUTH_MISSING_CREDENTIALS';
const AUTH_USERNAME_IN_USE = 'AUTH_USERNAME_IN_USE';
const AUTH_USER_NOT_FOUND = 'AUTH_USER_NOT_FOUND';
const AUTH_INVALID_PASSWORD = 'AUTH_INVALID_PASSWORD';

async function registerUser({ username, password }) {
    if (!username || !password) {
        throw new Error(AUTH_MISSING_CREDENTIALS);
    }

    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
        throw new Error(AUTH_USERNAME_IN_USE);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Users.create({ username, password: hashedPassword });

    return { username };
}

async function loginUser({ username, password }) {
    if (!username || !password) {
        throw new Error(AUTH_MISSING_CREDENTIALS);
    }

    const user = await Users.findOne({ where: { username } });
    if (!user) {
        throw new Error(AUTH_USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error(AUTH_INVALID_PASSWORD);
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        username: user.username,
    };
}

module.exports = {
    AUTH_INVALID_PASSWORD,
    AUTH_MISSING_CREDENTIALS,
    AUTH_USER_NOT_FOUND,
    AUTH_USERNAME_IN_USE,
    loginUser,
    registerUser,
};
