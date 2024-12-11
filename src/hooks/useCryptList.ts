import { CryptListProviderContext } from "@/providers/CryptListProvider";
import { useContext } from "react";

export default function useCryptList() {
  return useContext(CryptListProviderContext);
}
