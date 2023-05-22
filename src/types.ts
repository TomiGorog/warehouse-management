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
    warehouses: NoTitleWHProps[],
    randomWarehouseInitialization: () => Promise<void>,
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>,
}

//class whlist, constructorba wh listaja, nekik megvan az állapota, 
// listaként végigmenni a whneveken  arrayhez plusz functionok, 
// addpackages , currentCapacity van elegendő összesen, amugy iteralni warehouselistan, ha 1 wh closed/full akkor  continueval tovabb
// open v empty eseten h a maxből current h megadja a maradék capacityt, megnézzök h a maradék cap kisebb v nagyobb mint a packagek száma, ha kisebb akkor jó és lefoglalok x csomagot, oda berakom és
// kilépek a ciklusból breakkel , inkább for ciklussal , ha nem férünk be van acsomaglista, azt copy változóba, azt a ciklus közben updateled, kapacitás mennyiséget slicenal átpakolod a wh,be fullra teszted
// kint lévő package listát is frissítjük , mivel a wh tele , megy a következőre