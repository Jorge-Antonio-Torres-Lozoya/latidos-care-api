export function generateSixDigitRandomNumber(): number {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateSlug(dataString: string): string {
  const slug = dataString.toLowerCase().replace(/\s+/g, '');
  return slug;
}

export function generateComplexSlug(
  medication: string,
  sickness: string,
): string {
  const slug = (medication + sickness).toLowerCase().replace(/\s+/g, '-');
  return slug;
}
