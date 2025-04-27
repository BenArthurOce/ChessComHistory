class CustomError extends Error {
    constructor(details) {
        super(details.errorMessage);
        this.details = details;
    }
}
  
export default CustomError