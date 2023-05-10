import { useContext } from "react"
import WarehouseComponent from "./WarehouseComponent"
import { PackageContext } from "../context/packageContext.tsx"
import { addMandatoryWarehouseData } from "../services/fetchService.ts"
import { WarehouseProps } from "../types.ts"

const AllWarehousesComponent: React.FC = () => {

  const context = useContext(PackageContext)
  const warehousesArray: WarehouseProps[] = [];

  Object.entries(context!.warehouses).forEach(([key, value]) => {
    const warehouse = {
      [key]: value,
    };
    warehousesArray.push(warehouse);
  });


  return (
    <>AllWarehousesComponent
      {warehousesArray &&
        warehousesArray.map((warehouse, index) => {
          console.log(warehouse)
          const key = Object.keys(warehouse)[0]
          return (
            <WarehouseComponent key={index} name={warehouse[key].name} maxCapacity={warehouse[key].maxCapacity} currentCapacity={warehouse[key].currentCapacity} state={warehouse[key].state} packages={warehouse[key].packages} ></WarehouseComponent>
          )
        })
      }


      <button onClick={() => context?.randomWarehouseInitialization()}>Load Warehouse Up for initialization</button>
      <button onClick={() => addMandatoryWarehouseData()}>Add mandatory warehouse data to the warehouses</button>
    </>
  )
}

export default AllWarehousesComponent