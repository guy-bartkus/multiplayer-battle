const descriptiveList = [
    "Green",
    "Blue",
    "Red",
    "Yellow",
    "Brown",
    "Black",
    "White",
    "Strong",
    "Overpowered",
    "Miserable",
    "Aloof",
    "Pleasant",
    "Invisible",
    "Smelly",
    "Weird",
    "Pungent",
    "Final",
];
const thingList = [
    "Dragon",
    "Poop",
    "Snow",
    "Vampire",
    "Hobo",
    "Jerky",
    "Moose",
    "Banana",
    "Coffee",
    "Monster",
    "Pile",
    "Facehugger",
    "Zombie",
    "Mutant",
    "Boomer",
    "Jello",
    "Milk",
    "Boss",
    "Minion",
];
const numList = [
    42,
    69,
    420,
    666,
    777,
    911,
    5000,
    6969,
    9001,
    80085
];

export const generatePlayerName = (): string => {
    let desc = descriptiveList[randInt(0, descriptiveList.length)];
    let thing = thingList[randInt(0, thingList.length)];
    let num = numList[randInt(0, numList.length)];
    return `${desc}${thing}${num}`;
}

export const randInt = (min:number, max:number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const encodeBinaryStringArray = (arr: string[]): Uint8Array => {
    const enc = new TextEncoder();
    let len = arr.length;

    for(let item of arr) {
        len += item.length;
    }

    const combined = new Uint8Array(len);

    let i = 0;
    let i2 = 0;

    while(i < len) {
        const str = enc.encode(arr[i2]);
        combined.set([str.byteLength], i);
        combined.set(str, i+1);

        i2++;
        i += str.byteLength+1;
    }

    return combined;
}

export const decodeBinaryStringArray = (aB: ArrayBuffer): string[] => {
    const dec = new TextDecoder("utf-8");
    const dv = new DataView(aB);

    const strArr: string[] = [];

    let i = 0;

    while(i < aB.byteLength) {
        const uLen = dv.getUint8(i);

        strArr.push( dec.decode(aB.slice(i+1, i+uLen+1)) );

        i += uLen+1;
    }

    return strArr;
}