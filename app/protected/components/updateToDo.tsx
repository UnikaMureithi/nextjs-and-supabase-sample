import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toDoItemsType } from "@/types"
import { createClient } from '@/utils/supabase/client'; // Assuming you have a supabase client initialized in a separate file

interface UpdateToDoProps {
    todoItem: toDoItemsType;
}

export default function UpdateToDo({ todoItem }: UpdateToDoProps) {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState<number | undefined>(undefined);
    const [done, setDone] = useState<boolean>(false);
    const supabase = createClient();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('todo_table').update({ name, priority, done }).eq('id', todoItem.id);
            if (error) {
                throw new Error("Did not update row");
            }
            console.log('success')
            // Handle success or error
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button variant="secondary" className=" bg-blue-700 text-white" onClick={() => {
                        setName(todoItem.name);
                        setDone(todoItem.done);
                        setPriority(todoItem.priority);
                    }}>
                        Edit
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update a Task</DialogTitle>
                </DialogHeader>
                <div className="mt-5">
                    <form onSubmit={handleFormSubmit} method="post" className="grid gap-5">
                        <Input placeholder={todoItem.name} type="string" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Input placeholder={(todoItem.priority).toString()} type="number" max={3} min={0} value={priority} onChange={(e) => { setPriority(parseInt(e.target.value)) }} />
                        <div className="flex gap-5 pl-1 text-gray-700">
                            <Label>Done</Label>
                            <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
                        </div>
                        <DialogFooter>
                            <Button className=" bg-[#201f1f] text-white px-8" type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
