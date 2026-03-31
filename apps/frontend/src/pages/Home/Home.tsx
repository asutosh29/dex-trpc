import { Badge } from "@repo/ui/components/ui/badge"
import { Button } from "@repo/ui/components/ui/button"

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold">Dex Agent</h1>
      <p>All in one CMS Agent for Dex</p>
      <Button variant={"destructive"}>Try now!</Button>
      <Badge variant={"default"}>Badge</Badge>
    </div>
  )
}

export default Home