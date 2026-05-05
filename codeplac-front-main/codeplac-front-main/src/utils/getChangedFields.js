export function getChangedFields (original, current) {
  const changed = {}

  Object.keys(current).forEach((key) => {
    const originalValue = original[key]
    const currentValue = current[key]

    if (typeof currentValue === "string") {
      if (currentValue.trim() !== (originalValue || "").trim()) {
        changed[key] = currentValue
      }
    } else {
      if (currentValue !== originalValue) {
        changed[key] = currentValue
      }
    }
  })

  return changed
}