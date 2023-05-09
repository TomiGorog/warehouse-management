export interface IPackage {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

export type PackageContextType = {
    packagesByCategory: packageCatType | undefined
}

export type packageCatType = {
    mensClothing: IPackage[],
    womensClothing: IPackage[],
    jewelery: IPackage[],
    electronics: IPackage[],
}