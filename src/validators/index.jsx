import * as EmailValidator from 'email-validator';

export const validateEmail = (value) => {
  if (value === undefined) {
    return 'Please enter an email';
  }
  const email = value.trim();
  if (email === '') {
    return 'Please enter an email';
  }

  if (!EmailValidator.validate(email)) {
    return 'Please enter a valid email address';
  }

  return '';
};

export const validateName = (value) => {
  if (value === undefined) {
    return 'Please enter a name';
  }
  const name = value.trim();
  if (name === '' || name.length < 1) {
    return 'Please enter a name';
  }

  return '';
};

export const validatePhone = (value) => {
  if (value === undefined) {
    return 'Please enter a phone number';
  }
  const phone = value.trim();
  if (phone === '') {
    return 'Please enter a phone number';
  }
  if (phone.length !== 10) {
    return 'Please enter a phone number';
  }

  return '';
};