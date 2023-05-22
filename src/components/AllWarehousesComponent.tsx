import { useContext } from "react"
import WarehouseComponent from "./WarehouseComponent"
import { PackageContext } from "../context/packageContext.tsx"
import { addMandatoryWarehouseData } from "../services/fetchService.ts"

const AllWarehousesComponent: React.FC = () => {

  const {setRefetch} = useContext(PackageContext)
  const {warehouses, randomWarehouseInitialization} = useContext(PackageContext)

  const addWhData = async () => {
    const init = await addMandatoryWarehouseData();
    if (init) {
      setRefetch(refetch => !refetch);
    }
  };
  

  return (
    <>AllWarehousesComponent
      {warehouses &&
        warehouses.map((warehouse) => {
          return (
            <WarehouseComponent key={warehouse.name} name={warehouse.name} maxCapacity={warehouse.maxCapacity} currentCapacity={warehouse.currentCapacity} state={warehouse.state} packages={warehouse.packages} ></WarehouseComponent>
          )
        })
      }


      <button onClick={() => randomWarehouseInitialization()}>Load Warehouse Up for initialization</button>
      <button onClick={() => addWhData()}>Add mandatory warehouse data to the warehouses</button>
    </>
  )
}

export default AllWarehousesComponent