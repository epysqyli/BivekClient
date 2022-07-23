interface IValidationError {
  errors: {
    Name?: Array<string>;
    Title?: Array<string>;
  };
}

export default IValidationError;
