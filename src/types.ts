export interface IPackage {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

export type PackageContextType = {
    packages: IPackage[]
}
