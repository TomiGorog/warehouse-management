import { NoTitleWHProps, WarehouseProps } from "../types"


const WarehouseComponent: React.FC<NoTitleWHProps> = ( {name, maxCapacity, currentCapacity, state, packages}: NoTitleWHProps) => {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Maximum capacity: {maxCapacity}</p>
      <p>Currenct capacity: {currentCapacity}</p>
      <p>Warehouse state: {state}</p>
    </div>
  )
}

export default WarehouseComponent