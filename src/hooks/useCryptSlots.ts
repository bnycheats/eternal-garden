import { CryptSlotsProviderContext } from "@/providers/CryptSlotsProvider";
import { useContext } from "react";

export default function useCryptSlots() {
  return useContext(CryptSlotsProviderContext);
}
