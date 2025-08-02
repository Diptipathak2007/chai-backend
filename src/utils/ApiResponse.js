class ApiResponse{
    constructor(statusCode, message, data) {
        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Response message
        this.data = data; // Optional data payload
        this.success = statusCode >= 200 && statusCode < 400; // Success flag based on status code
    }
}

export { ApiResponse };