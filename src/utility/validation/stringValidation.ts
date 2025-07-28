const stringValidation = (string: string) => {
  let validate;
  let stringValidation = /^[a-zA-Z0-9]+$/;
  let i: number;
  for (i = 0; i < string.length; i++) {
    if (stringValidation.test(string.charAt(i))) {
      validate = true;
      break;
    } else {
      validate = false;
    }
  }
  return validate;
};

const isAlphaNumeric = (value: string) => {
  const condition = new RegExp(/^(?!.* {2})[a-z0-9 ]+$/i);
  return condition.test(value);
};

const checkEmail = (value: string) => {
  const condition = new RegExp(
    /^[_a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]+)*@[a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]{3})*(?:\.[_a-za-zA-Z]{2,3})$/,
  );
  return condition.test(value);
};
const checkPassword = (value: string) => {
  const condition = new RegExp(/.{6,}$/); // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/gm
  return condition.test(value);
};
const checkNumber = (value: string) => {
  const condition = new RegExp(/^[0-9-]{10}$/);
  return condition.test(value);
};
const checkNumeric = (value: string) => {
  const condition = new RegExp(/^[0-9]+$/);
  return condition.test(value);
};
const checkDotNumeric = (value: string) => {
  const condition = new RegExp(/^[0-9]*\.?[0-9]*$/);
  return condition.test(value);
};
const checkPswd = (value: string) => {
  const condition = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/+_]).{8,}$/,
  );
  return condition.test(value);
};
const checkName = (value: string) => {
  const condition = new RegExp(/^[A-Za-z0-9 ]+$/);
  return condition.test(value);
};
const checkString = (value: string) => {
  const condition = new RegExp(/^[a-zA-Z ]+$/);
  return condition.test(value);
};
const checkMobileNumber = (value: string) => {
  const condition = new RegExp(/^\d{10}$/);
  return condition.test(value);
};
const isValidUrl = (url: string): boolean => {
  const urlRegex =
    /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
  const result = url.match(urlRegex);
  return result !== null;
};
const checkProgramName = (value: string) => {
  const condition = new RegExp(/^[\p{L}\p{N}\p{M}_\-0-9!@#$%^&*()\s]+$/u);
  return condition.test(value);
};

export {
  stringValidation,
  checkEmail,
  checkPassword,
  checkNumber,
  checkPswd,
  checkName,
  checkString,
  checkNumeric,
  isValidUrl,
  checkMobileNumber,
  checkProgramName,
  isAlphaNumeric,
  checkDotNumeric,
};
