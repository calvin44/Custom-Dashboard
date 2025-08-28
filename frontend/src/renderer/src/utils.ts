export const isInvalidCell = (field: string, value: unknown): boolean => {
  if (field === 'BrandName') {
    return !value || (typeof value === 'string' && value.trim() === '')
  }

  // For now Min and Max are always valid (default = 0),
  // but we keep the structure open for future rules.
  return false
}
