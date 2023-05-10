import { createContext, useEffect, useState } from "react";
import { fetchPackages, setupRandomWarehouses } from "../services/fetchService";
import { IPackage, PackageContextType } from "../types";



export const PackageContext = createContext<PackageContextType | null>(null)
interface IElement { children: JSX.Element | JSX.Element[] }

const PackageProvider = ({ children }: IElement) => {

    const [packagesWithoutCategory, setPackagesWithoutCategory] = useState<IPackage[]>([{
        id: 0,
        title: 'default package',
        price: 0,
        category: 'none',
        description: 'default package description',
        image: 'default image'
    }])

    const [warehouses, setWarehouses] = useState([])
    // currently unused
    // const [packagesByCategory, setPackagesByCategory] = useState<packageCatType>({
    //     mensClothing: [],
    //     womensClothing: [],
    //     jewelery: [],
    //     electronics: [],
    // })

    useEffect(() => {
        fetchWarehouses()

    }, []);


    const fetchWarehouses = async () => {
        fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses.json`)
            .then(resp => resp.json())
            .then(data => {
                setWarehouses(data)
            })
    }

    const randomWarehouseInitialization = async () => {
        const packages = await fetchPackages();
        setPackagesWithoutCategory(packages)
        if (packages) {
            setupRandomWarehouses(packages)
        }
    }

    return (
        <PackageContext.Provider value={{ packagesWithoutCategory, randomWarehouseInitialization }}>
            {children}
        </PackageContext.Provider>
    );
};

export default PackageProvider;