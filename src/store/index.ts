import { create } from "zustand";

interface Store {
  // hospitalValue: string;
  // companionValue: string;
  // setHospital: (val: string) => void;
  // setCompanion: (val: string) => void;
  userType: number;
  setType: (val: number) => void;
}

const useStore = create<Store>((set) => ({
  userType: 0,
  // companionValue: "",
  // setHospital: (val: string) => set({ hospitalValue: val }),
  setType: (val: number) => set({ userType: val }),
}));

export default useStore;
