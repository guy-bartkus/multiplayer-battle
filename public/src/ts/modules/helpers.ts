const descriptiveList = [
    "Green",
    "Blue",
    "Red",
    "Yellow",
    "Brown",
    "Strong",
    "Miserable",
    "Aloof",
    "Pleasant",
    "Invisible",
    "Smelly",
    "Weird",
    "Pungent",
    "Final",
    "Horrid",
    "Nasty",
    "Euphoric",
    "Trippy",
    "Dazed",
    "Dreamy",
    "Drowsy",
    "Foolish",
    "Crippled",
    "Screaming",
    "Poggers",
    "Flaccid",
    "Rotten",
    "Moist",
    "Simple",
    "Tasty",
    "Venti",
    "Grande",
    "Short",
    "Long",
    "Tall",
    "Seedy",
    "Toothy",
    "Robotic",
    "Feisty",
    "Dirty",
    "Soaked",
    "Squishy",
    "Distant",
    "Noobish",
    "Pwned",
    "Lanky",
    "Peppered",
    "Sad",
    "Moldy",
    "Spicy",
    "Bloody",
    "Cute",
    "Daring",
    "Creepy",
    "Curious",
    "Lazy",
    "Tyrant",
    "Anxious",
    "Adorable",
    "Grabby",
    "Handsy",
    "Panicking",
    "Combative",
    "Annoying",
    "Cryptic",
    "Wheezy",
    "Shady",
    "Thinking",
    "Insane",
    "Loose",
    "Limp",
    "Scary",
    "Furious",
    "Ecstatic",
    "Shady",
    "Derpy",
    "Burnt",
    "Tarnished",
    "Messy",
    "Birthday",
    "Alpha",
    "Beta",
    "Soggy",
    "Siamese",
    "Surprised",
    "Bad",
    "Lusty",
    "Wild",
    "Wet",
    "Crusty",
    "Twitchy",
    "Throbby",
    "Extreme",
    "Crazy",
    "Crazed",
    "Godly",
    "Suss",
    "Sassy"
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
    "Zombie",
    "Mutant",
    "Boomer",
    "Jello",
    "Milk",
    "Boss",
    "Minion",
    "Pervert",
    "Kebab",
    "Frog",
    "Noob",
    "Nub",
    "Life",
    "Dream",
    "Snek",
    "Lizard",
    "Beetle",
    "Cat",
    "Wheezer",
    "Geezer",
    "Creeper",
    "Beast",
    "Peasant",
    "Thief",
    "Tech",
    "Orange",
    "Bread",
    "Wife",
    "Cuckold",
    "Actor",
    "Artist",
    "Doctor",
    "Monkey",
    "Ghost",
    "Camera",
    "Cookie",
    "Dealer",
    "Chef",
    "Knight",
    "Joker",
    "Blob",
    "Member",
    "Bird",
    "Crumpet",
    "Bagel",
    "Toast",
    "Goose",
    "Potato",
    "Dwarve",
    "Elf",
    "Loner",
    "Wolf",
    "Nerd",
    "Shadow",
    "Grandpa",
    "Grandma",
    "Uncle",
    "Aunty",
    "Mother",
    "Father",
    "Sister",
    "Brother",
    "Crab",
    "Rogue",
    "Goblin",
    "Wizard",
    "Warlock",
    "Gorgon",
    "Ranger",
    "Monk",
    "Brawler",
    "Zerker",
    "Jerker"
];
const numList = [
    42,
    69,
    420,
    666,
    777,
    911,
    616,
    1066,
    1337,
    1420,
    1696,
    1942,
    1969,
    1984,
    2000,
    2012,
    2042,
    2069,
    2420,
    3042,
    3069,
    3420,
    4042,
    4069,
    4420,
    5000,
    5042,
    5069,
    5420,
    6969,
    7777,
    9001,
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

export const encodeBinaryStringArray = (arr: string[]): ArrayBuffer => {
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

    return combined.buffer;
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

export function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}