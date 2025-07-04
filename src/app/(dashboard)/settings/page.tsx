"use client";

import Header from "@/components/common/header";
import { useAuth } from "@/context/auth";
import { Role } from "@/models/role";
import { useRoles } from "@/hooks/use-roles";
import { usePermissions } from "@/hooks/use-permissions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsPage = () => {
  const { user } = useAuth();
  const { roles, isLoading: isLoadingRoles } = useRoles();
  const { permissions, isLoading: isLoadingPermissions } = usePermissions();

  if (user?.role !== Role.SuperAdmin) {
    return (
      <div className="flex-1 py-6 px-8">
        <h1 className="text-2xl font-bold">Permission Denied</h1>
        <p className="mt-2">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header title="Settings" />
      <div className="flex-1 py-6 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Roles</h2>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Permissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingRoles ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[250px]" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    roles?.map((role) => (
                      <TableRow key={role.name}>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.permissions.join(", ")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Permissions</h2>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingPermissions ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-4 w-[150px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[300px]" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    permissions?.map((permission) => (
                      <TableRow key={permission.objectId}>
                        <TableCell>{permission.name}</TableCell>
                        <TableCell>{permission.description}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
