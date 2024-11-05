import React from "react";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { GlobalApi } from "./../../../service/GlobalApi.js";
import { title } from "process";
import { useUser } from "@clerk/clerk-react";

function AddResume() {

  const [openDailog, setOpenDailog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);


  const onCreate = async() => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        Title: resumeTitle,
        ResumeId: uuid,
        UserEmail: user?.primaryEmailAddress?.emailAddress,
        UserName: user?.fullName
      }
    }
    GlobalApi.CreateNewResume(data).then(resp => {
      console.log(resp);
      if (resp) {
        setLoading(false);

      }
    })
  }

  return (
    <div>
      <div
        className="p-14 py-24 
            border items-center flex
            justify-center bg-secondary
            rounded-lg h-[280px]
            hover:scale-110 transition-all hover:shadow-md
            cursor-pointer border-dotted"
        onClick={() => setOpenDailog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your New Resume</p>
              <Input className="my-2" placeholder="Eg. Full Stack Resume "
                onChange={(e)=>setResumeTitle(e.target.value) } />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDailog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle}
                onClick={() => onCreate()}>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
