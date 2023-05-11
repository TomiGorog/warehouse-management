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
export type WarehouseProps = {
    [warehouseName: string]: {
        name: string,
        maxCapacity: number,
        currentCapacity: number,
        state: 'open' | 'closed' | 'full' | 'empty',
        packages: IPackage[]
    }
}

export type NoTitleWHProps = {
    name: string,
    maxCapacity: number,
    currentCapacity: number,
    state: 'open' | 'closed' | 'full' | 'empty',
    packages: IPackage[]
}

export type PackageContextType = {
    packagesWithoutCategory: IPackage[],
    // packagesByCategory: packageCatType 
    warehouses: WarehouseProps
    randomWarehouseInitialization: () => Promise<void>
}

export type packageCatType = {
    mensClothing: IPackage[],
    womensClothing: IPackage[],
    jewelery: IPackage[],
    electronics: IPackage[],
}
