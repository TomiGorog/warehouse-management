import { IPackage, NoTitleWHProps, WarehouseProps } from "../types";


export const closeWarehouse = (whInfo: NoTitleWHProps, warehouses: WarehouseProps) => {
    const warehousesCopy: WarehouseProps = warehouses
    const replacementArray: NoTitleWHProps[] = []
    Object.keys(warehouses).forEach((key) => {
        if (warehouses[key].name != whInfo.name) {
            replacementArray.push(warehouses[key])
        }
    })
    let totalEmptyPlaces = 0

    for (let i = 0; i < replacementArray.length; i++) {
        const currentEmptyPlaces = replacementArray[i].maxCapacity - replacementArray[i].currentCapacity
        totalEmptyPlaces += currentEmptyPlaces
    }
    if (totalEmptyPlaces >= whInfo.currentCapacity) {
        replacementArray.forEach((warehouse: NoTitleWHProps) => {
            const emptyPlacesPerWh = warehouse.maxCapacity - warehouse.currentCapacity
            console.log(warehouse, "to work with", Object.keys(warehouses[whInfo.name].packages).length)
            if (emptyPlacesPerWh >= whInfo.currentCapacity && warehouse.currentCapacity > 0 && Object.keys(warehouses[whInfo.name].packages).length > 0 && warehouse.state === "open") {
                console.log(warehouses[whInfo.name].packages, "INSIDE")

                const movedPackages = []
                const packagesToBeMovedlength = Object.keys(warehouses[whInfo.name].packages).length

                if (warehouse.currentCapacity + packagesToBeMovedlength <= warehouse.maxCapacity) {
                    Object.keys(warehouses[whInfo.name].packages).forEach((pack: any) => {
                        warehouse.packages[pack] = whInfo.packages[pack]
                    })
                    warehouses[whInfo.name].state = "closed"
                    warehouses[whInfo.name].currentCapacity = 0
                    warehouses[whInfo.name].packages = []
                    warehouse.currentCapacity = warehouse.currentCapacity + packagesToBeMovedlength
                    
                    console.log(warehouses)
                    
                    //if more than one wh can take
                }
                 else if (emptyPlacesPerWh < warehouses[whInfo.name].currentCapacity && 
                    warehouse.currentCapacity > 0 && 
                    Object.keys(warehouses[whInfo.name].packages).length > 0 && 
                    warehouse.state === "open") {
                        console.log(Object.keys(warehouses[whInfo.name].packages).length, "to see split")
                        if(Object.keys(warehouses[whInfo.name].packages).length > emptyPlacesPerWh) {
                            let howManyFits =  emptyPlacesPerWh
                            Object.keys(warehouses[whInfo.name].packages).forEach((pack: any) => {
                                if(howManyFits > 0){
                                    howManyFits--
                                    console.log(...Object.entries(warehouses[whInfo.name].packages))
                                }
                            })
                            console.log(warehouses)
                        }
                }
                else {
                    // const packToMoveThere = 
                }
            }
        })
        console.log(warehouses)
    } else {
        window.alert('Error, not enough space to close the warehouse')
    }
}


          // warehouse.packages.push(whList)
        //         fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${warehouse.name}/packages.json`, {
        //             method: 'PATCH',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(whList)
        //         })
        //             .then(() => {
        //                 const newCurrentCapacity = addedListCounter + warehouse.currentCapacity
        //                 return fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${warehouse.name}/currentCapacity.json`, {
        //                     method: 'PUT',
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                     },
        //                     body: JSON.stringify(newCurrentCapacity)
        //                 })
        //             })
        //             .then(() => {
        //                 const whState = { state: "closed", currentCapacity: 0 }
        //                 return fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${whInfo.name}.json`, {
        //                     method: 'PATCH',
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                     },
        //                     body: JSON.stringify(whState)
        //                 })
        //             })
        //         return fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${whInfo.name}/packages.json`, {
        //             method: 'DELETE',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },

        //         })
        //             .then(response => {
        //                 console.log(response)
        //                 if (!response.ok) {
        //                     throw new Error('Failed to upload objects.');
        //                 }
        //             })
        //             .catch(error => {
        //                 console.error('Error:', error);
        //             });