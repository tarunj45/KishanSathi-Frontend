// Only Indian 10-digit mobile numbers (starting 6-9) are accepted.
export const MOBILE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strips spaces/dashes so "98765 43210" is treated as a valid entry. */
export function normalizeMobile(mobile: string): string {
  return mobile.replace(/[\s-]/g, "").replace(/^(\+91|91)/, "");
}

export function validateMobile(mobile: string): string | null {
  const value = normalizeMobile(mobile.trim());
  if (!value) return "Mobile number is required.";
  if (!/^\d+$/.test(value)) return "Mobile number can contain digits only.";
  if (value.length !== 10)
    return "Mobile number must be exactly 10 digits.";
  if (!MOBILE_REGEX.test(value))
    return "Enter a valid 10-digit Indian mobile number (starting 6-9).";
  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return "Email is required.";
  if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
  return null;
}

/**
 * Sign-up password policy:
 * at least 8 characters, one special character, and one digit.
 */
export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/\d/.test(password))
    return "Password must include at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>_\-\[\]\\/~`+=;']/.test(password))
    return "Password must include at least one special character.";
  return null;
}

/** Lighter check used on the login screen (only presence). */
export function validateLoginPassword(password: string): string | null {
  if (!password) return "Password is required.";
  return null;
}

export function validateIdentifier(identifier: string): string | null {
  const value = identifier.trim();
  if (!value) return "Mobile number or email is required.";
  if (value.includes("@")) return validateEmail(value);
  return validateMobile(value);
}

/** OTP is a 6-digit numeric code. */
export function validateOtp(otp: string): string | null {
  const value = otp.trim();
  if (!value) return "Enter the OTP sent to your email.";
  if (!/^\d{6}$/.test(value)) return "OTP must be a 6-digit code.";
  return null;
}
