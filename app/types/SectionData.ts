export interface Data {
  x: number
  y: number
}

export interface SectionData {
  datasets: Array<{
    label: string
    borderColor: string
    backgroundColor: string
    data: Array<{
      x: number
      y: number
    }>
  }>
}
