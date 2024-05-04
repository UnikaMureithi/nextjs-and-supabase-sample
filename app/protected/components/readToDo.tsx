import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toDoItemsType } from "@/types"
import { useToDo } from "../context/todoContext"
import UpdateToDo from "./updateToDo"
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client" // Assuming you have a supabase client initialized in a separate file

export default function ReadToDo() {
    const [toDoItems, setToDoItems] = useState<toDoItemsType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: toDoItems, error } = await supabase.from('todo_table').select('*').order('id', { ascending: true });
                if (error) {
                    throw new Error("Did not fetch data");
                }
                setToDoItems(toDoItems || []);
            } catch (error) {
                console.error(error);
                // Handle error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const { tableHeaderNames, handleCheckBoxUpdate } = useToDo();

    //delete
 async function deleteAction(id:number) {
    console.log("Deleted successfully")
    const { error } = await supabase.from('todo_table').delete().eq('id', id)
    if(error){throw new Error("Did not fetch component")}
}

    return (
        <Table className="mt-10">
            <TableHeader>
                <TableRow>
                {tableHeaderNames.map((tableHeaderName:string)=>(
                    <TableHead key={tableHeaderName} className="text-center font-semibold text-base text-slate-700">{tableHeaderName}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
            {toDoItems.length > 0 ? toDoItems.map((todoItem)=>(
                <TableRow key={todoItem.id}>
                    <TableCell className="text-center">{todoItem.name}</TableCell>
                    <TableCell>
                        {
                        todoItem.priority === 0 ? <Badge className="bg-[#FF6A06] text-white w-24 h-8 flex items-center justify-center">Urgent</Badge>:
                        todoItem.priority === 1 ? <Badge className="bg-[#007A00] text-white w-24 h-8 flex items-center justify-center">Medium</Badge>:
                        <Badge className="bg-[#808080] text-white w-24 h-8 flex items-center justify-center">Minor</Badge>
                        }
                    </TableCell>
                    <TableCell className="flex justify-center align-middle mt-2">
                        {todoItem.done ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                            <div className="flex flex-row items-center justify-center">
                                <div>
                                    <UpdateToDo todoItem={todoItem}/>
                                </div>
                            <div>
                                <Button variant="destructive" className="ml-5 bg-[#C30010] text-white" onClick={()=>deleteAction(todoItem.id)}>Delete</Button>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={5}>No tasks available</TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}
