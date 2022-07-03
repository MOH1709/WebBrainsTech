import validator from "validator";

const Validator = {
  isEmail(val) {
    return validator.isEmail(val);
  },
  isPassword(val = "") {
    return val.length >= 8 && !val.includes(" ");
  }
}

export default Validator;