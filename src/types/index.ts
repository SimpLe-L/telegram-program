export interface IHospital {
  icon: string,
  id: string,
  name: string,
  introduction: string,
  review: number,
  score: number,
  level: string
}

export interface ICompanion {
  icon: string,
  id: string,
  name: string,
  introduction: string,
  customers: number,
  score: number
}

export type IOrder = Omit<ICompanion, 'customers' | 'score'> & { start: string, end: string, hospital: string }