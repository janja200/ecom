"use client"
import Heading from "@/components/store/Heading"
import { orderColumn, columns } from "./columns"
import { DataTable } from "@/components/store/ui/data-table"
import { Separator } from "@/components/ui/separator"

interface orderClientProps{
  data:orderColumn[]
}
export const OrderClient:React.FC<orderClientProps>=({
  data
})=>{

    return(
        <>
           <Heading
              title={`Orders (${data.length})`}
              description="Manage orders for your store"
           />
         <Separator/>
         <DataTable searchKey="products" columns={columns} data={data}/>
        
        </>
    )
}