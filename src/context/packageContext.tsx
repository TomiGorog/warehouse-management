import { createContext, useEffect, useState } from "react";
import { fetchPackages, fetchWarehouses, setupRandomWarehouses } from "../services/fetchService";
import { IPackage, PackageContextType, WarehouseType } from "../types";



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

    const [warehouses, setWarehouses] = useState<WarehouseType[]>([])
    // currently unused
    // const [packagesByCategory, setPackagesByCategory] = useState<packageCatType>({
    //     mensClothing: [],
    //     womensClothing: [],
    //     jewelery: [],
    //     electronics: [],
    // })

    useEffect(() => {
        fetchWarehouses(setWarehouses) 
    }, []);



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