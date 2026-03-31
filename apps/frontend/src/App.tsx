import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { trpcClient } from "./lib/trpc";
import type { User } from '@repo/server/trpc/appRouter';

export function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(()=>{
    trpcClient.userList.query().then((res)=>{
      setUsers(res)
    })
  },[])

  return (
    <>
    {JSON.stringify(users)}
  <Home/>
    </>
  );
}