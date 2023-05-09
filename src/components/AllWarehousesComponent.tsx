import { useContext, useEffect, useState } from "react"
import WarehouseComponent from "./WarehouseComponent"
import { PackageContext } from "../context/packageContext.tsx"
import { IPackage } from "../types.ts"

const AllWarehousesComponent = () => {

  const context = useContext(PackageContext)
  console.log(context?.packagesByCategory)
  const loadUpObj: IPackage = {
    id: 10123,
    title: "example",
    category: "electronics",
    price: 64,
    description: "aswd",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"

  }

  useEffect(() => {
    
    // loadUpWarehouse()
  }, [context])
  const arr: IPackage[] = []
  arr.push(loadUpObj)
  return (
    <>AllWarehousesComponent
      <WarehouseComponent name={"Budapest warehouse"} maxCapacity={10} currentCapacity={2} warehouseState="open"></WarehouseComponent>
      <button onClick={() => context?.randomWarehouseInitialization()}>Load Warehouse Up for initialization</button>
    </>
  )
}

export default AllWarehousesComponent