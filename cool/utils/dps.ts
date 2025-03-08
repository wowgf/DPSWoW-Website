export function formatDpsValue(value: number, fixed = 2, showUnit = false) {
  if (value < 10000) return value.toFixed(0)
  return (value / 10000).toFixed(fixed) + (showUnit ? '万' : '')
}