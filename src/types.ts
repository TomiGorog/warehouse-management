export interface IPackage {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

export type PackageContextType = {
    packagesWithoutCategory: IPackage[],
    // packagesByCategory: packageCatType 
    randomWarehouseInitialization : () => Promise<void>
}

export type packageCatType = {
    mensClothing: IPackage[],
    womensClothing: IPackage[],
    jewelery: IPackage[],
    electronics: IPackage[],
}

