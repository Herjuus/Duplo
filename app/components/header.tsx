import NewApplicationDialog from "./new-application-dialog";
import { Button } from "./ui/button";

export default function Header() {
    return(
        <header className="flex justify-between items-center">
            <h1 className="font-bold text-3xl hover:cursor-pointer">DUPLO</h1>
            <div className="flex">
                {/* <NewApplicationDialog /> */}
                {/* <Button variant={"link"} className="">Sign out</Button> */}
            </div>
        </header>
    )
}