import { createContext, useEffect, useState } from "react";
import { fetchPackages, postPackagesToWarehouses, setupRandomWarehouses } from "../services/fetchService";
import { IPackage, PackageContextType, packageCatType } from "../types";



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
    const [packagesByCategory, setPackagesByCategory] = useState<packageCatType>({
        mensClothing: [],
        womensClothing: [],
        jewelery: [],
        electronics: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const packages = await fetchPackages();
                setPackagesWithoutCategory(packages)
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
        fetchWarehouses()
        randomWarehouseInitialization()
    }, []);
    console.log(packagesByCategory)
    console.log(packagesWithoutCategory)

    const loadUpWarehouse = async (object: IPackage) => {

        fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/wh2.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Objects uploaded successfully!', response);
                } else {
                    throw new Error('Failed to upload objects.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }

    const fetchWarehouses = async () => {
        fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses.json`)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    const randomWarehouseInitialization = async () => {
        if (packagesWithoutCategory) { 
            const packagesToPost = setupRandomWarehouses(packagesWithoutCategory) 
           
        }

    }

    return (
        <PackageContext.Provider value={{ packagesWithoutCategory, packagesByCategory, randomWarehouseInitialization }}>
            {children}
        </PackageContext.Provider>
    );
};

export default PackageProvider;