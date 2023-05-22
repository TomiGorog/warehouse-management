import { useContext } from "react"
import { closeWarehouse } from "../services/whManagementService"
import { NoTitleWHProps } from "../types"
import { PackageContext } from "../context/packageContext"
import { closeThisWarehouse } from "../services/closeService"


const WarehouseComponent: React.FC<NoTitleWHProps> = ( {name, maxCapacity, currentCapacity, state, packages}: NoTitleWHProps) => {

  const {warehouses,setRefetch} = useContext(PackageContext)

  const closeWh = async () => {
    const whClosed = await closeThisWarehouse(whInfo, warehouses)

  }
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Maximum capacity: {maxCapacity}</p>
      <p>Currenct capacity: {currentCapacity}</p>
      <p>Warehouse state: {state}</p>
      <button onClick={() => {
        const whInfo: NoTitleWHProps = {
          currentCapacity,
          maxCapacity,
          name,
          packages,
          state
        }
        closeThisWarehouse(whInfo, warehouses)
      }} >Close warehouse</button>
    </div>
  )
}

export default WarehouseComponent