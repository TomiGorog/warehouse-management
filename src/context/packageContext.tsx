import { createContext, useEffect, useState } from "react";
import { fetchPackages } from "../services/fetchService";
import { IPackage, PackageContextType } from "../types";



export const PackageContext = createContext<PackageContextType | null>(null)
interface IElement { children: JSX.Element | JSX.Element[] }

const PackageProvider = ({children}: IElement) => {

    const [packages, setPackages] =  useState<IPackage[]>([{
        id: 23,
        title: "example package",
        price: 100,
        category: "example category",
        description: "example description",
        image: "example image"
    }])

    useEffect(() => {
      fetchPackages()
        .then(data => {
          console.log(data)
          setPackages(data)
        })
  
    }, [])
return (
    <PackageContext.Provider value={{ packages }}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;