import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toDoItemsType } from "@/types"

interface ReactToDoProps{
    toDoItems: toDoItemsType[];
    tableHeaderNames: string[];
    name: string;
    priority: number;
    setName: (name: string) => void;
    setPriority: (priority: number) => void;
    setDone: (done: boolean) => void;
    setUpdateTask: (task: toDoItemsType | null) => void;
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;
    handleCheckboxUpdate: (id:number, done:boolean) => void}

    export default function ReadToDo({toDoItems, tableHeaderNames, name, priority, setName, setPriority, setUpdateTask, handleUpdate, setDone, handleDelete, handleCheckboxUpdate}:ReactToDoProps) {  return (
    <Table className="mt-10">
        <TableHeader>
        <TableRow>
        {tableHeaderNames.map((tableHeaderName:string)=>(
            <TableHead key={tableHeaderName} className="text-center font-semibold text-base text-slate-700">{tableHeaderName}</TableHead>
        ))}
        </TableRow>
        </TableHeader>
        <TableBody>
        {toDoItems && toDoItems.length > 0 ? toDoItems.map((todoItem:toDoItemsType, index:number)=>(
            <TableRow key={todoItem.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell className="text-center">{todoItem.name}</TableCell>
                <TableCell>
                    {
                    todoItem.priority === 0 ? <Badge className="bg-[#FF6A06] text-white w-24 h-8 flex items-center justify-center">Urgent</Badge>:
                    todoItem.priority === 1 ? <Badge className="bg-[#007A00] text-white w-24 h-8 flex items-center justify-center">Medium</Badge>:
                    <Badge className="bg-[#808080] text-white w-24 h-8 flex items-center justify-center">Minor</Badge>
                    }
                </TableCell>
                <TableCell className="flex justify-center align-middle mt-2">
                <input type="checkbox" checked={todoItem.done} className="border-gray-600" onChange={(e)=>{
                        e.preventDefault()
                        handleCheckboxUpdate(todoItem.id, e.target.checked)
                    }}/>
                </TableCell>
                <TableCell>
                        {/* update a task */}
                        <div className="flex flex-row items-center justify-center">
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                <div>
                                        <Button variant="secondary" className=" bg-blue-700 text-white" onClick={()=>{
                                            setUpdateTask(todoItem)
                                            setName(todoItem.name)
                                            setDone(todoItem.done)
                                            setPriority(todoItem.priority)
                                            }}>
                                                Edit</Button>
                                    </div>                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update a Task</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-5">
                                    <form onSubmit={()=>{handleUpdate(todoItem.id)}} method="post" className="grid gap-5">                                            <div className="flex gap-5 pl-1 text-gray-700">
                                                <Label>Done</Label>
                                                {todoItem.done===true ? <input type="checkbox" defaultChecked onChange={()=>setDone(false)}/> : <input type="checkbox" onChange={()=>setDone(true)}/>}
                                            </div>
                                            <DialogFooter>
                                                <Button className=" bg-[#201f1f] text-white px-8" type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <Button variant="destructive" className="ml-5 bg-[#C30010] text-white" onClick={()=>handleDelete(todoItem.id)}>Delete</Button>
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