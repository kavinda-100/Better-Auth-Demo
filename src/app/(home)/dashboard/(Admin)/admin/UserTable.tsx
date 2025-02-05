"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@prisma/client";
import { authClient } from "../../../../../server/auth-client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import ImpersonateUser from "./ImpersonateUser";

type UserTableProps = {
  sessionId: string;
};

const UserTable = ({ sessionId }: UserTableProps) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [limit, setLimit] = React.useState(10);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await authClient.admin.listUsers({
          query: { limit: limit },
        });
        if (response?.data) {
          return response.data.users as User[];
        }
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers()
      .then((data) => {
        if (data) {
          setUsers(data);
        }
      })
      .catch((err) => {
        setError(err as Error);
      });
  }, [limit]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span>Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-4">
        <span className="text-red-500">Error: {error.message}</span>
      </div>
    );
  }

  return (
    <Card className={"mx-auto my-5 w-full min-w-[300px] lg:max-w-6xl"}>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={`user-${user.id}-${user.email}`}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className={"font-bold capitalize"}>
                  {user.role}
                </TableCell>
                <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {user.banned ? (
                    <span className="font-bold text-red-500">Banned</span>
                  ) : (
                    <span className="font-bold text-green-500">Active</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <ImpersonateUser
                    userId={user.id}
                    email={user.email}
                    mySessionId={sessionId}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        <Button onClick={() => setLimit(10)} variant={"secondary"}>
          Reset
        </Button>
        <Button onClick={() => setLimit(limit + 10)}>Load More</Button>
      </CardFooter>
    </Card>
  );
};
export default UserTable;
