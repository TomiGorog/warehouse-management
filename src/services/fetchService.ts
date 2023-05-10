import { IPackage, WarehouseProps,  } from "../types";

export const fetchPackages = () => {
    return fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
}

export const fetchWarehouses = async (setter: React.Dispatch<React.SetStateAction<WarehouseProps>> ) => {
    fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses.json`)
        .then(resp => resp.json())
        .then(data => {
            setter(data)
        })
}

export const setupRandomWarehouses = (objectsArray: IPackage[]) => {

    const toWarehouse1: IPackage[] = [];
    const toWarehouse2: IPackage[] = [];
    const toWarehouse3: IPackage[] = [];
    const toWarehouse4: IPackage[] = [];

    const targetArrays = [toWarehouse1, toWarehouse2, toWarehouse3, toWarehouse4];

    // equally distribute objects to target arrays
    // for (let i = objectsArray.length - 1; i >= 0; i--) {
    //     const randomIndex = Math.floor(Math.random() * (i + 1));
    //     const object = objectsArray[randomIndex];

    //     targetArrays[i % 4].push(object);

    //     objectsArray[randomIndex] = objectsArray[i];
    //     objectsArray[i] = object;
    // }

    //randomly distribute objects to the target arrays
    while (objectsArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * objectsArray.length);
        const object = objectsArray[randomIndex];

        const randomTargetIndex = Math.floor(Math.random() * targetArrays.length);
        const targetArray = targetArrays[randomTargetIndex];
        targetArray.push(object);

        objectsArray.splice(randomIndex, 1);
    }
    return postPackagesToWarehouses(toWarehouse1, toWarehouse2, toWarehouse3, toWarehouse4)
}


export const postPackagesToWarehouses = (toWarehouse1: IPackage[], toWarehouse2: IPackage[], toWarehouse3: IPackage[], toWarehouse4: IPackage[]) => {
    const allPackages = [toWarehouse1, toWarehouse2, toWarehouse3, toWarehouse4]
    for (let i = 0; i < allPackages.length; i++) {
        let whNumber: number = i
        whNumber += 1
        allPackages[i].forEach(pack => {
            fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/warehouse${whNumber}/packages.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pack)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to upload objects.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        )
    }

}

export const addMandatoryWarehouseData = () => {

    const warehouseData = {
        name: '',
        maxCapacity: 15,
        currentCapacity: 0,
        state: 'empty'
    }
    fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses.json`)
        .then(resp => resp.json())
        .then(data => {
            Object.keys(data).forEach((warehouse: string) => {
                const arrayOfObjects = Object.keys(data[warehouse].packages).map(key => data[warehouse].packages[key]);
                warehouseData.name = warehouse
                warehouseData.currentCapacity = arrayOfObjects.length
                if (warehouseData.currentCapacity === 0) {
                    warehouseData.state = 'empty'
                } else if (warehouseData.currentCapacity === warehouseData.maxCapacity) {
                    warehouseData.state = 'full'
                } else if (warehouseData.currentCapacity < warehouseData.maxCapacity && warehouseData.currentCapacity > 0) {
                    warehouseData.state = 'open'
                }
                fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/${warehouse}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(warehouseData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to upload objects.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })

        })

}