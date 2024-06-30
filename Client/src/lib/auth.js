const isWeakPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const commonPasswords = [
    "password",
    "123456",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "password1",
    "qwerty",
    "abc123",
    "password123",
  ];

  if (password.length < minLength) {
    return true;
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
    return true;
  }

  if (commonPasswords.includes(password)) {
    return true;
  }

  return false;
};

const isValidEmail = (email) => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  return isValidEmail;

};

const isValidName = (name) =>{
    return name.trim() !== ""
}

export { isWeakPassword , isValidEmail , isValidName };
