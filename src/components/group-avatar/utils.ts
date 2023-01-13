export const getInitials = (text: string, limit: number = 2) => {
  return text
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase())
    .filter((_, i) => i < limit)
    .join("");
};
