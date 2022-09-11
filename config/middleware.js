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
}