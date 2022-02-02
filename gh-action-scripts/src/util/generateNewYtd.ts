function generateMeta(ytd, now) {
  return {
    lastUpdated: now,
    version: ytd.meta.version + 1
  }
}

export function generateNewYtd(ytd, athletesYtd, now) {
  const newYtd = {
    meta: generateMeta(ytd, now),
    athletes: [...ytd.athletes],
  }

  return newYtd;
}
