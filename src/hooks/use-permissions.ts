import useSWR from "swr";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Permission } from "@/models/permission";

const fetchPermissions = async (): Promise<Permission[]> => {
  const permissionsCollection = collection(db, "permissions");
  const permissionsSnapshot = await getDocs(permissionsCollection);
  return permissionsSnapshot.docs.map(doc => doc.data() as Permission);
};

export const usePermissions = () => {
  const { data, error } = useSWR("permissions", fetchPermissions);

  return {
    permissions: data,
    isLoading: !error && !data,
    isError: error,
  };
};
