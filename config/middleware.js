require('dotenv').config()

const jwt = require('jsonwebtoken');

module.exports = {
    logPath: (req, res, next) => {
        console.log(`Method: ${req.method}`);
        console.log(`Path: ${req.path}`);
        next();
    },
    missingPath: (req, res) => {
        return res.status(404).json({
            status: 404,
            errors: {
                title: "Path not found",
                detail: `The requested path was not found`,
                source: req.path
            },
        });
    },
    errorHandler: (err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        res.status(err.status || 500).json({
            "errors": [
                {
                    "status": err.status,
                    "title": err.name,
                    "detail": err.message
                }
            ]
        })
    },
    checkToken: (req, res, next) => {
        const token = req.headers["x-access-token"];

        if (!token) {
            res.status(500).json({
                "errors": {
                    source: req.path,
                    title: "Failed authentication",
                    detail: "No x-access-token in header"
                }
            })
        }
        jwt.verify(token, process.env.JWT_SECRET, function (err) {
            if (!err) {
                next();
            }
        });
    }
}
