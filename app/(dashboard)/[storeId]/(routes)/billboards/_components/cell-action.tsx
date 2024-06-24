"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { billboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/store/modals/AlertModal"

interface CellActionProps{
    data:billboardColumn
}
export const CellAction:React.FC<CellActionProps>=({
    data
})=>{

    const onCopy=(id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success("billboard Id copied to clipboard")
    }
    const router=useRouter()
    const params=useParams()
    const [loading,setloading]=useState(false)
    const [open,setOpen]=useState(false)
    const updateBillboard=(id:string)=>{
        router.push(`/${params.storeId}/billboards/${data.id}`)
    }
    const onDelete=async()=>{
        try {
          setloading(true)
          await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
          router.refresh()
          toast.success("Billboard deleted")
        } catch (error) {
          toast.error("Make sure you removed all categories first")
        }finally{
          setloading(false)
          setOpen(true)
        }
      }
    return(
     <>
     <AlertModal  isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
     <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4"/>
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end">
         <DropdownMenuLabel>
            Actions
         </DropdownMenuLabel>
         <DropdownMenuItem onClick={()=>onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2"/>
                copy
         </DropdownMenuItem>
         <DropdownMenuItem onClick={()=>updateBillboard(data.id)}>
            <Edit className="h-4 w-4 mr-2"/>
                update
         </DropdownMenuItem>
         <DropdownMenuItem onClick={()=>setOpen(true)}>
            <Trash className="h-4 w-4 mr-2"/>
                delete
         </DropdownMenuItem>
       </DropdownMenuContent>
     </DropdownMenu>
     </>
    )
}