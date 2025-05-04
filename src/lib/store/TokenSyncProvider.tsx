"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import api from "@/lib/services/api";

export default function TokenSyncProvider({ children }: { children: React.ReactNode }) {
  // Adjust the selector path to your actual Redux state shape
//   const token = useSelector((state: any) => state.auth.token);

  const { token } = useSelector((state: any) => state.user.loggedinUserData);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return <>{children}</>;
}