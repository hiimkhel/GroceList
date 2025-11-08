/**
 * @file errorHandler.js
 * @description Global error handling middleware
 */

const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error",
        stack: process.env.NODE_ENV === "development" ? null : err.stack
    })
}

module.exports = errorHandler;