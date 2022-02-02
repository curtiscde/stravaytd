function generateMeta(ytd, now) {
  return {
    lastUpdated: now,
    version: (ytd?.meta?.version || 0) + 1
  }
}

export function generateNewYtd(ytd, athletesYtd, now) {
  const newYtd = {
    meta: generateMeta(ytd, now),
  }

  return newYtd;
}
