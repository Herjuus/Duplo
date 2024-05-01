import NewApplicationDialog from "@/components/new-application-dialog";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import axios from "axios";

type Deployment = {
  name: string,
  image: string,
  port: number
}

async function getDeployments() {
  let res = await axios.get<Deployment[]>("http://localhost:8080/apps");
  return res.data;
}

export default async function Home() {
  const deployments = await getDeployments() || null;

  return (
    <main className="flex-1 w-full flex flex-col">
      <div className="flex flex-1 gap-2 h-full">
        <div className="w-full">
          <NewApplicationDialog />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {deployments.map((deployment) => (
              <Card className="p-2 flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle>
                      {deployment.name}
                    </CardTitle>
                    <CardDescription>
                      {deployment.image}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>Port: {deployment.port}</p>
                    {/*<p>Links:</p>*/}
                    {/*<ul className="list-disc list-inside">*/}
                    {/*  <a className="underline list-item w-fit" href="testapp.k3s.herjus.no">testapp.k3s.herjus.no</a>*/}
                    {/*  <a className="underline list-item w-fit" href="testapp.com">testapp.com</a>*/}
                    {/*</ul>*/}
                  </CardContent>
                </div>
                <CardFooter>
                  <Button variant={"outline"} className="w-full">Edit</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
