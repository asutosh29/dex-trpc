import { useNavigate } from "react-router";

import { Button } from "@repo/ui/components/ui/button";

const Home = () => {
  const router = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-8xl font-bold">Dex Agent</h1>
      <p>All in one CMS Agent for Dex</p>
      <Button variant={"destructive"} onClick={() => router("/chat")}>
        Try now!
      </Button>
    </div>
  );
};

export default Home;
