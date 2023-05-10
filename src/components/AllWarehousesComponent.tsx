import { useContext } from "react"
import WarehouseComponent from "./WarehouseComponent"
import { PackageContext } from "../context/packageContext.tsx"

const AllWarehousesComponent = () => {

  const context = useContext(PackageContext)
  
  return (
    <>AllWarehousesComponent
      <WarehouseComponent name={"Budapest warehouse"} maxCapacity={10} currentCapacity={2} warehouseState="open"></WarehouseComponent>
      <button onClick={() => context?.randomWarehouseInitialization()}>Load Warehouse Up for initialization</button>
    </>
  )
}

export default AllWarehousesComponent