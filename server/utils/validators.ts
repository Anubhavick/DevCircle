export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCollegeDomain = (email: string, domain: string): boolean => {
  return email.endsWith(domain);
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "");
};
