class ErrorHandler extends Error{
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


export const errorMiddleWare = (err , req , res , next) => {

    err.message = err.message || "Invalid Server Error"   // <-This is the default error message
    err.statusCode = err.statusCode || 500                // <-This is the default statusCode for internal server error
    
    return res.status(err.statusCode).json({
        success : false,
        message : err.message,
    })
}


export default ErrorHandler