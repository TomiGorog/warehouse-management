
type warehouseProps = {
    maxCapacity: number,
    currentCapacity: number,
    warehouseState: 'open' | 'close' | 'full' | 'empty',

}
const WarehouseComponent = ({{maxCapacity, currentCapacity, warehouseState}}: warehouseProps) => {
  return (
    <div>WarehouseComponent</div>
  )
}

export default WarehouseComponent