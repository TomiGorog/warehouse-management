export interface IPackage {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    rating: {
        count: number,
        rate: number
    }
}

export type PackageContextType = {
    packagesWithoutCategory: IPackage[],
    // packagesByCategory: packageCatType 
    warehouses: WarehouseType[],
    randomWarehouseInitialization: () => Promise<void>
}

export type packageCatType = {
    mensClothing: IPackage[],
    womensClothing: IPackage[],
    jewelery: IPackage[],
    electronics: IPackage[],
}

export type WarehouseType = {
    packageId: {
        id: number,
        title: string,
        price: number,
        category: string,
        description: string,
        image: string,
        rating: {
            count: number,
            rate: number
        }
    }
}