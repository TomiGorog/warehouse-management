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

  }, [refetch]);


  const randomWarehouseInitialization = async () => {
    const packages: IPackage[] = await fetchPackages();
    setPackagesWithoutCategory(packages)
    if (packages) {
      setupRandomWarehouses(packages)
    }
  }

  return (
    <PackageContext.Provider value={{ packagesWithoutCategory, warehouses, randomWarehouseInitialization, setRefetch }}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;