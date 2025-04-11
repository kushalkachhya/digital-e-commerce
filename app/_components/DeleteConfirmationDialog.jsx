import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button";
function DeleteConfirmationDialog({children,DeleteProduct}) {


    return (
        <Dialog>
        <DialogTrigger>
            {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>

              <h2>
              Do you really want to Delete this product?
              </h2> 
              <div className="flex justify-end gap-5 mt-5">
                <Button>Close</Button>
                <Button variant="destructive" onClick={DeleteProduct}>Delete</Button>
              </div>
            
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
}

export default DeleteConfirmationDialog