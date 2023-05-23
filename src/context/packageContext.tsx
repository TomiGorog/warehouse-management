import { createContext, useEffect, useState } from "react";
import { fetchPackages, fetchWarehouses, setupRandomWarehouses } from "../services/fetchService";
import { IPackage, NoTitleWHProps, PackageContextType, } from "../types";



export const PackageContext = createContext({} as PackageContextType)
interface IElement { children: JSX.Element | JSX.Element[] }

const PackageProvider = ({ children }: IElement) => {

  const [packagesWithoutCategory, setPackagesWithoutCategory] = useState<IPackage[]>([])
  

  const [warehouses, setWarehouses] = useState<NoTitleWHProps[]>([]

  )

const [refetch, setRefetch] = useState<boolean>(false)

  useEffect(() => {
    fetchWarehouses(setWarehouses)
    console.log( packagesWithoutCategory)

  }, [refetch]);


  const randomWarehouseInitialization = async () => {
    const packages: IPackage[] = await fetchPackages();
    setPackagesWithoutCategory(packages)
    if (packages) {
      console.log("packages in functuon", packages)
      setupRandomWarehouses(packages)
      setRefetch(refetch => !refetch)
    }
  }
  console.log( packagesWithoutCategory)

  return (
    <PackageContext.Provider value={{ packagesWithoutCategory, warehouses, setWarehouses, randomWarehouseInitialization, setRefetch }}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;