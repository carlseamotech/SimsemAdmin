import useSWR from "swr";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Role {
  name: string;
  permissions: string[];
}

const fetchRoles = async (): Promise<Role[]> => {
  const rolesCollection = collection(db, "roles");
  const rolesSnapshot = await getDocs(rolesCollection);
  return rolesSnapshot.docs.map(doc => doc.data() as Role);
};

export const useRoles = () => {
  const { data, error } = useSWR("roles", fetchRoles);

  return {
    roles: data,
    isLoading: !error && !data,
    isError: error,
  };
};
