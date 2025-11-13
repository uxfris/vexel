function extractNameFromEmail(email: string): string {
  const username = email.split("@")[0];
  // Capitalize first letter, replace dots/underscores with spaces
  return username
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}
