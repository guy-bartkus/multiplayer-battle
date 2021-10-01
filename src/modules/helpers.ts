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