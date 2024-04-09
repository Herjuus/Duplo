"use client";

import { Dialog, DialogHeader, DialogTrigger, DialogTitle, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";

export default function NewApplicationDialog() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    New application
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New application</DialogTitle>
                </DialogHeader>
                <div>test</div>
            </DialogContent>
        </Dialog>
    )
}