
type warehouseProps = {
  name: string,
    maxCapacity: number,
    currentCapacity: number,
    warehouseState: 'open' | 'close' | 'full' | 'empty',

}
const WarehouseComponent = ({name, maxCapacity, currentCapacity, warehouseState}: warehouseProps) => {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Maximum capacity: {maxCapacity}</p>
      <p>Currenct capacity: {currentCapacity}</p>
      <p>Warehouse state: {warehouseState}</p>
    </div>
  )
}

export default WarehouseComponent