import { useContext, useEffect } from "react"
import WarehouseComponent from "./WarehouseComponent"
import { PackageContext } from "../context/packageContext.tsx"
import { IPackage } from "../types.ts"

const AllWarehousesComponent = () => {

  const context = useContext(PackageContext)
  console.log(context)

  useEffect(() => {
    const mensClothing: IPackage[] = []
    const womensClothing: IPackage[] = []
    const jewelery: IPackage[] = []
    const electronics: IPackage[] = []
    context && context.packages.forEach(onePackage => {
      if (onePackage.category === "men's clothing") {
        mensClothing.push(onePackage)
      } else if (onePackage.category === "women's clothing") {
        womensClothing.push(onePackage)
      } else if (onePackage.category === "jewelery") {
        jewelery.push(onePackage)
      } else if (onePackage.category === "electronics") {
        electronics.push(onePackage)
      }
    })
    console.log(womensClothing)
  }, [context])
  return (
    <>AllWarehousesComponent
      <WarehouseComponent name={"asd"} maxCapacity={10} currentCapacity={2} warehouseState="open"></WarehouseComponent>
    </>
  )
}

export default AllWarehousesComponent