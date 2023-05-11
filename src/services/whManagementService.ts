import { IPackage, NoTitleWHProps, WarehouseProps } from "../types";


export const closeWarehouse = (whInfo: NoTitleWHProps, warehouses: WarehouseProps) => {

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
            if (emptyPlacesPerWh >= whInfo.currentCapacity && whInfo.currentCapacity > 0) {

                const whList: NoTitleWHProps = {}
                Object.keys(whInfo.packages).forEach((pack: any) => {
                    whList[pack] = whInfo.packages[pack]
                    whInfo.currentCapacity--

                })
                console.log(whList)
                fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${warehouse.name}/packages.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(whList)
                })
                    .then(res => res.json())
                    .then(() => {
                        const whState = { state: "closed" }
                        return fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${whInfo.name}/state.json`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify("closed")
                        })
                    })
                return fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${whInfo.name}/packages.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                })
                    .then(response => {
                        console.log(response)
                        if (!response.ok) {
                            throw new Error('Failed to upload objects.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

            }
        })
        warehouses[whInfo.name].state = "closed"
    } else {
        window.alert('Error, not enough space to close the warehouse')
    }
}