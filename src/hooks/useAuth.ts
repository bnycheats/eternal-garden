import { AuthContext } from "@/providers/authProvider";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}
