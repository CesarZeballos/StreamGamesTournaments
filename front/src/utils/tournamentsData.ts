import csgo from "../app/assets/images/banners/csgo.jpg";
import fortnite from "../app/assets/images/banners/fortnite.jpg";
import lol from "../app/assets/images/banners/lol.png";
import previous from "../app/assets/images/icons/previous.png";
import next from "../app/assets/images/icons/next.png";
import csIcon from "../app/assets/images/icons/cs-A.png";
import ftIcon from "../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../app/assets/images/icons/lol-A.png";
import beginner from "../app/assets/images/icons/beginner-dark.png";
import advanced from "../app/assets/images/icons/advanced-dark.png";
import expert from "../app/assets/images/icons/expert-dark.png";
import vip from "../app/assets/images/icons/premium.png";
import { StaticImageData } from "next/image";

type ImageSource = StaticImageData | string;

export const gameIcons: { [key: string]: ImageSource } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": csIcon,
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": csIcon,
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": csIcon,
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": ftIcon,
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": ftIcon,
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": ftIcon,
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": lolIcon,
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": lolIcon,
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": lolIcon,
};

export const games: { [key: string]: ImageSource } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": csgo,
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": csgo,
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": csgo,
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": fortnite,
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": fortnite,
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": fortnite,
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": lol,
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": lol,
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": lol,
};

export const name: { [key: string]: string } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": "Counter Strike",
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": "Counter Strike",
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": "Counter Strike",
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": "Fortnite",
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": "Fortnite",
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": "Fortnite",
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": "League of Legends",
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": "League of Legends",
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": "League of Legends",
};

export const categoryIcons: { [key: string]: ImageSource } = {
    "CATEGORY1": beginner,
    "CATEGORY2": advanced,
    "CATEGORY3": expert,
};

export const description: { [key: string]: string } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": "Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.",
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": "Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.",
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": "Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.",
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
};

export const navigationIcons = {
    previous,
    next,
    vip,
};

export const price: { [key: string]: {price: string} } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": {price: "CHEAP"},
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": {price: "MIDDLE"},
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": {price:"EXPENSIVE"},
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": {price: "CHEAP"},
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": {price: "MIDDLE"},
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": {price:"EXPENSIVE"},
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": {price: "CHEAP"},
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": {price: "MIDDLE"},
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": {price:"EXPENSIVE"},
};