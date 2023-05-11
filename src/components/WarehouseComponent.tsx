import { useContext } from "react"
import { closeWarehouse } from "../services/whManagementService"
import { NoTitleWHProps } from "../types"
import { PackageContext } from "../context/packageContext"


const WarehouseComponent: React.FC<NoTitleWHProps> = ( {name, maxCapacity, currentCapacity, state, packages}: NoTitleWHProps) => {

  const {warehouses} = useContext(PackageContext)
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Maximum capacity: {maxCapacity}</p>
      <p>Currenct capacity: {currentCapacity}</p>
      <p>Warehouse state: {state}</p>
      <button onClick={() => {
        const whInfo: NoTitleWHProps = {
          name,
          maxCapacity,
          currentCapacity,
          state,
          packages
        }
        closeWarehouse(whInfo, warehouses)
      }} >Close warehouse</button>
    </div>
  )
}

export default WarehouseComponent