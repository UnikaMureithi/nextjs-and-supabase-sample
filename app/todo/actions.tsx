'use server'
import { createClient } from "@/utils/supabase/server"
const supabase = createClient()
import { toDoItemsType } from "@/types"

//delete
export async function deleteAction({id}:{id:number}) {
    console.log("Deleted successfully")
    const { error } = await supabase.from('todo_table').delete().eq('id', id)
    if(error){throw new Error("Did not fetch component")}
}

// read
export async function readAction() {
    const { data: toDoItems, error } = await supabase.from('todo_table').select('*');
    if(error){throw new Error("Did not fetch data")}
    return toDoItems;
}

//create
export async function  createAction({name, priority, done}:toDoItemsType){
    const { error } = await supabase.from('todo').insert({ name: name, priority:priority, done:done })
    if(error){throw new Error("Did not create row")}
}

//update
export async function updateAction({id, name, priority, done}:toDoItemsType){
    const {error} = await supabase.from('todo').update({name, priority, done}).eq('id',id)
    if(error){throw new Error("Did not update row")}
}