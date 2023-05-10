import { createContext, useEffect, useState } from "react";
import { fetchPackages, fetchWarehouses, setupRandomWarehouses } from "../services/fetchService";
import { IPackage, PackageContextType, WarehouseProps,  } from "../types";



export const PackageContext = createContext<PackageContextType | null>(null)
interface IElement { children: JSX.Element | JSX.Element[] }

const PackageProvider = ({ children }: IElement) => {

    const [packagesWithoutCategory, setPackagesWithoutCategory] = useState<IPackage[]>([
    //     {
    //     id: 0,
    //     title: 'default package',
    //     price: 0,
    //     category: 'none',
    //     description: 'default package description',
    //     image: 'default image',
    //     rating: {
    //         count: 1,
    //         rate: 0
    //     }
    // }
])
const exampleObject: WarehouseProps = {
    warehouseName: {
      name: 'Example Warehouse',
      maxCapacity: 100,
      currentCapacity: 50,
      state: 'open',
      packages: [
        {
          // Example package
          id: 1,
          title: 'Package 1',
          price: 10,
          category: 'Category 1',
          description: 'Package 1 description',
          image: 'package1.jpg',
          rating: {
            count: 4,
            rate: 10,
          },
        },
        {
          // Example package
          id: 2,
          title: 'Package 2',
          price: 15,
          category: 'Category 2',
          description: 'Package 2 description',
          image: 'package2.jpg',
          rating: {
            count: 5,
            rate: 20,
          },
        },
      ],
    },
  };
    const [warehouses, setWarehouses] = useState<WarehouseProps>(
      exampleObject
    )
    

    useEffect(() => {
        fetchWarehouses(setWarehouses) 
    }, []);

    console.log(warehouses)


    const randomWarehouseInitialization = async () => {
        const packages = await fetchPackages();
        setPackagesWithoutCategory(packages)
        if (packages) {
            setupRandomWarehouses(packages)
        }
    }

    return (
        <PackageContext.Provider value={{ packagesWithoutCategory, warehouses, randomWarehouseInitialization }}>
            {children}
        </PackageContext.Provider>
    );
};

export default PackageProvider;