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

export function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}