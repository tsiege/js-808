export function stepPerMs(bpm = 128) {
  return (((60 / bpm) * 4) / 16) * 1000
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
