export function validatePasswordRules(password: string): string | null {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter || !hasNumber) {
    return "Password must contain at least one letter and one number";
  }

  return null; // no error
}