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

export const encodePlayerList = (arr: [number, string][], len: number): Uint8Array => {
    const enc = new TextEncoder();

    const combined = new Uint8Array(len+arr.length);

    let i = 0;
    let i2 = 0;

    while(i2 < arr.length) {
        const str = enc.encode(arr[i2][1]);
        combined.set([arr[i2][0]], i) //Player ID
        combined.set([str.byteLength+1], i+1); //+1 because one byte for player id
        combined.set(str, i+2); //Player name

        i2++;
        i += str.byteLength+2; //+2 instead of +1 because next iteration needs to start at proper index.
    }

    return combined;
}

export const decodePlayerList = (aB: ArrayBuffer): [number, string][] => {
    const dec = new TextDecoder("utf-8");
    const dv = new DataView(aB);

    const plyArr: [number, string][] = [];

    let i = 0;

    while(i < aB.byteLength) {
        const id = dv.getUint8(i);
        const uLen = dv.getUint8(i+1);

        plyArr.push( [id, dec.decode(aB.slice(i+2, i+uLen+1))] );

        i += uLen+1;
    }

    return plyArr;
}