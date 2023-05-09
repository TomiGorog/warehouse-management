import { useContext } from "react"
import WarehouseComponent from "./WarehouseComponent"
import { PackageContext } from "../context/packageContext.tsx"

const AllWarehousesComponent = () => {

  const context = useContext(PackageContext)

  return (
    <>AllWarehousesComponent
      <WarehouseComponent name={"asd"} maxCapacity={10} currentCapacity={2} warehouseState="open"></WarehouseComponent>
    </>
  )
}

export default AllWarehousesComponent