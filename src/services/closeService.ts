import { NoTitleWHProps } from "../types";

export const closeThisWarehouse = (currentWarehouse: NoTitleWHProps, allWarehouses: NoTitleWHProps[]) => {
    console.log(currentWarehouse, allWarehouses)
    const warehousesWOutClosing = allWarehouses.filter(warehouse => warehouse.name !== currentWarehouse.name)
    let packagesToManipulate = currentWarehouse.packages
    let packagesLeft = []
    for (let i = 0; i < warehousesWOutClosing.length; i++) {
        if(warehousesWOutClosing[i].state !== 'full' && warehousesWOutClosing[i].state !== 'closed' && warehousesWOutClosing[i].name !== currentWarehouse.name) {
            if(warehousesWOutClosing[i].currentCapacity + currentWarehouse.currentCapacity <= warehousesWOutClosing[i].maxCapacity) {
                warehousesWOutClosing[i].currentCapacity = warehousesWOutClosing[i].currentCapacity + currentWarehouse.currentCapacity;
                warehousesWOutClosing[i].packages = [...warehousesWOutClosing[i].packages, ...packagesToManipulate];
                currentWarehouse.state = 'closed';
                currentWarehouse.currentCapacity = 0;
                currentWarehouse.packages = []
                if(warehousesWOutClosing[i].currentCapacity === warehousesWOutClosing[i].maxCapacity) {
                    warehousesWOutClosing[i].state = 'full';
                }
            } else {
                const numToExtract = warehousesWOutClosing[i].maxCapacity -  warehousesWOutClosing[i].currentCapacity
                const whereToSlice = currentWarehouse.currentCapacity - numToExtract
                const packagesToAdd = packagesToManipulate.slice(0, whereToSlice)
                packagesLeft = packagesToManipulate.slice(whereToSlice)
                warehousesWOutClosing[i].packages = [...warehousesWOutClosing[i].packages, ...packagesToAdd];
                packagesToManipulate = packagesLeft
                warehousesWOutClosing[i].state = 'full';
                currentWarehouse.packages = packagesLeft
            } 
        } else {
            console.log("full")
            
        }
    }
    allWarehouses = [currentWarehouse, ...warehousesWOutClosing]
    console.log(allWarehouses)
    return allWarehouses
}