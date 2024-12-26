import { create } from "zustand";

interface Store {
  hospitalValue: string;
  companionValue: string;
  setHospital: (val: string) => void;
  setCompanion: (val: string) => void;
}

const useStore = create<Store>((set) => ({
  hospitalValue: "",
  companionValue: "",
  setHospital: (val: string) => set({ hospitalValue: val }),
  setCompanion: (val: string) => set({ companionValue: val }),
}));

export default useStore;
