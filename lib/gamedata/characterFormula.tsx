



export const getProficiencyBonus = (level: number) => {
    let values = [1,2,3,3,4,5,5,6,7,7,8,9,9,10,11,11,12,13,13,14];
    if(level <= 0){
        return 1;
    } else if (level > values.length){
        return 15
    } else {
        return values[level];
    }
}

export const getMaxPowerLevel = (level: number) => {
    let values = [0,1,2,2,3,3,3,4,4,4,5];
    if(level <= 0){
        return 0;
    } else if (level > values.length){
        return 5
    } else {
        return values[level];
    }
}

export const getTotalPowerPoints = (level: number) => {
    let values = [2,6,10,14,18,22,26,30,34,42,44,48];
    if(level <= 0){
        return 0;
    } else if (level >= values.length){
        return 52;
    } else {
        return values[level];
    }
}