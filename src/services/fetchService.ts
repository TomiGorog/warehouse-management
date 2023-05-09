import { IPackage } from "../types";

export const fetchPackages = () => {
    return fetch('https://fakestoreapi.com/products')
        .then(res => res.json())

}


export const setupRandomWarehouses = (objectsArray: IPackage[]) => {

    const toWarehouse1: IPackage[] = [];
    const toWarehouse2: IPackage[] = [];
    const toWarehouse3: IPackage[] = [];
    const toWarehouse4: IPackage[] = [];

    const targetArrays = [toWarehouse1, toWarehouse2, toWarehouse3, toWarehouse4];

    for (let i = objectsArray.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const object = objectsArray[randomIndex];

        targetArrays[i % 4].push(object);

        objectsArray[randomIndex] = objectsArray[i];
        objectsArray[i] = object;
    }

    return postPackagesToWarehouses(toWarehouse1, toWarehouse2, toWarehouse3, toWarehouse4)
}


export const postPackagesToWarehouses = (toWarehouse1: IPackage[], toWarehouse2: IPackage[], toWarehouse3: IPackage[], toWarehouse4: IPackage[]) => {
    const allPackages = [toWarehouse1, toWarehouse2, toWarehouse3, toWarehouse4]
    console.log(allPackages)

    for (let i = 0; i < allPackages.length; i++) {
        console.log(allPackages[i])
        const whNumber: number = i += 1
        allPackages[i].forEach(pack => {
            fetch(`${import.meta.env.VITE_DATABASEURL}/warehouses/warehouse${whNumber}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pack)
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
        )
    }
}