exports.CommonErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next("error on headersSent");
    } else {
        if (err.message) {
            res.status(err.status || 500).json({
                status: false,
                message: err.message,
            });
        } else {
            res.send("There was an error");
        }
    }
};
