export interface IHospital {
  icon: string;
  id: string;
  name: string;
  introduction: string;
  review: number;
  score: number;
  level: string;
  overview: string;
  position: string;
}

export interface ICompanion {
  name: string;
  birthday: string;
  phone: string;
  email: string;
  rating: bigint;
  orderNum: bigint;
  pricePerOrder: bigint;
  icon: string;
  introduction: string;
  addr: `0x${string}`;
}

// export interface ICompanion {
//   icon: string;
//   id: string;
//   name: string;
//   introduction: string;
//   customers: number;
//   score: number;
// }

export interface IOrder {
  companion: `0x${string}`;
  user: `0x${string}`;
  startTime: bigint;
  endTime: bigint;
  hospital: string;
  phoneNumber: string;
  message: string;
  deposit: bigint;
  isCompleted: boolean;
  Idx: bigint;
}
