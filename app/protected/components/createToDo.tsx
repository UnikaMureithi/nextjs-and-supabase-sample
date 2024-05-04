"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from '@/utils/supabase/client'; // Assuming you have a supabase client initialized in a separate file

export default function CreateToDo() {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState<number | undefined>(undefined);
    const supabase = createClient()

    const handleInsert = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await supabase.auth.getUser(); // Await the promise here
        if (user) {
            try {
                const { data: toDoItems, error } = await supabase.from('todo_table').insert({ name, priority: 0, done: false });
                if (error) {
                    throw new Error("Did not create row");
                }
                // Handle success or error
            } catch (error) {
                console.error(error);
                // Handle error
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex justify-center mt-5">
                    <Button className=" bg-[#201f1f] text-white px-10">Create a new Task</Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Task</DialogTitle>
                </DialogHeader>
                <div className="mt-5">
                    <form onSubmit={handleInsert} method="post" className="grid gap-5">
                        <Input placeholder="name" type="string" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Input placeholder="priority" type="number" max={3} min={0} value={priority} onChange={(e) => { setPriority(parseInt(e.target.value)) }} />
                        <DialogFooter>
                            <Button className=" bg-[#201f1f] text-white px-8" type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
