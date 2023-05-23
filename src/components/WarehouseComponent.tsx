import { useContext } from "react"
import { closeWarehouse } from "../services/whManagementService"
import { NoTitleWHProps } from "../types"
import { PackageContext } from "../context/packageContext"
import { closeThisWarehouse } from "../services/closeService"
import { updateWarehouses } from "../services/fetchService"


const WarehouseComponent: React.FC<NoTitleWHProps> = ({ name, maxCapacity, currentCapacity, state, packages }: NoTitleWHProps) => {

  const { warehouses, setWarehouses, setRefetch } = useContext(PackageContext)

  const whInfo: NoTitleWHProps = {
    currentCapacity,
    maxCapacity,
    name,
    packages,
    state
  }

  const closeWh = () => {
    const whClosed =  closeThisWarehouse(whInfo, warehouses)
    if (whClosed) {
      updateWarehouses(whClosed)
      setRefetch(refetch => !refetch);
    }
    console.log(warehouses)
  }
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Maximum capacity: {maxCapacity}</p>
      <p>Currenct capacity: {currentCapacity}</p>
      <p>Warehouse state: {state}</p>
      <button onClick={() => {

        closeWh()
      }} >Close warehouse</button>
    </div>
  )
}

export default WarehouseComponent