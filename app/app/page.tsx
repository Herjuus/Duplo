import NewApplicationDialog from "@/components/new-application-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <div className="flex flex-1 gap-2 h-full">
        <div className="w-full">
          <NewApplicationDialog />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <Card className="p-2 flex flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle>
                    React app
                  </CardTitle>
                  <CardDescription>
                    herjus/react-app
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Replicas: 2</p>
                  <p>Links:</p>
                  <ul className="list-disc list-inside">
                    <a className="underline list-item w-fit" href="testapp.k3s.herjus.no">testapp.k3s.herjus.no</a>
                    <a className="underline list-item w-fit" href="testapp.com">testapp.com</a>
                  </ul>
                </CardContent>
              </div>
              <CardFooter>
                <Button variant={"outline"} className="w-full">Edit</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
