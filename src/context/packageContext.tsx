import { createContext, useEffect, useState } from "react";
import { fetchPackages } from "../services/fetchService";
import { IPackage, PackageContextType, packageCatType } from "../types";



export const PackageContext = createContext<PackageContextType | null>(null)
interface IElement { children: JSX.Element | JSX.Element[] }

const PackageProvider = ({ children }: IElement) => {

    
    const [packagesByCategory, setPackagesByCategory] = useState<packageCatType | undefined>()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const packages = await fetchPackages();
      
            const mensClothing: IPackage[] = [];
            const womensClothing: IPackage[] = [];
            const jewelery: IPackage[] = [];
            const electronics: IPackage[] = [];
      
            packages.forEach((onePackage: IPackage) => {
              if (onePackage.category === "men's clothing") {
                mensClothing.push(onePackage);
              } else if (onePackage.category === "women's clothing") {
                womensClothing.push(onePackage);
              } else if (onePackage.category === "jewelery") {
                jewelery.push(onePackage);
              } else if (onePackage.category === "electronics") {
                electronics.push(onePackage);
              }
            });
      
            const packWithCat: packageCatType = {
              mensClothing: mensClothing,
              womensClothing: womensClothing,
              jewelery: jewelery,
              electronics: electronics,
            };
      
            setPackagesByCategory(packWithCat);
          } catch (error) {
            console.error("Error fetching packages:", error);
          }
        };
      
        fetchData();
      }, []);
    console.log(packagesByCategory)
    return (
        <PackageContext.Provider value={{ packagesByCategory}}>
            {children}
        </PackageContext.Provider>
    );
};

export default PackageProvider;