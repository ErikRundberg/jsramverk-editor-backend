const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConfig = require("../config/database");

const secret = process.env.JWT_SECRET;
const saltRounds = 10;
let database;

const errorMessage = (title, detail, source) => {
    return {
        status: 500,
        errors: {
            title: title,
            detail: detail,
            source: source
        }
    }
}

const userFacade = {
    register: async function register(body) {
        const email = body.email;
        const password = body.password;
        const path = "/user/registration";

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            database = await dbConfig.getDb("users");

            const user = await database.collection.findOne({email: email});

            if (user) {
                return errorMessage("Registration error", "User is already registered", path);
            }

            const result = await database.collection.insertOne({
                email: email,
                password: hashedPassword
            });

            const token = await jwt.sign({ email: email }, secret, { expiresIn: "1h"});

            if (!token) {
                return errorMessage("Token error", "Token could not be made", path);
            }
            return {
                _id: result.insertedId,
                token: token,
                email
            };
        } catch (e) {
            return errorMessage("Database error", e.message, path);
        } finally {
            await database.client.close();
        }
    },

    login: async function login(body) {
        const email = body.email;
        const password = body.password;
        const path = "/user/login";

        try {
            database = await dbConfig.getDb("users");

            const user = await database.collection.findOne({email: email});
            if (!user) {
                return errorMessage("Login error", "User doesn't exist", path);
            }
            const match = bcrypt.compareSync(password, user?.password);

            if (match) {
                const token = await jwt.sign({ email: email }, secret, { expiresIn: "1h"});
                if (!token) {
                    return errorMessage("Token error", "Token could not be made", path);
                }
                return {
                        token: token,
                        email
                    };
                }
            return errorMessage("Login error", "Password is incorrect", path);
        } catch (e) {
            return errorMessage("Database error", e.message, path);
        } finally {
            await database.client.close();
        }
    }
}

module.exports = userFacade;
