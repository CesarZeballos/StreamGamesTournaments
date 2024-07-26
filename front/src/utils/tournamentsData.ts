import csgo from "../app/assets/images/banners/csgo.jpg";
import fortnite from "../app/assets/images/banners/fortnite.jpg";
import lol from "../app/assets/images/banners/lol.png";
import previous from "../app/assets/images/icons/previous.png";
import next from "../app/assets/images/icons/next.png";
import csIcon from "../app/assets/images/icons/cs-A.png";
import ftIcon from "../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../app/assets/images/icons/lol-A.png";
import bronze from "../app/assets/images/icons/medal-bronze.png";
import silver from "../app/assets/images/icons/medal-silver.png";
import gold from "../app/assets/images/icons/medal-gold.png";
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
    "CATEGORY1": bronze,
    "CATEGORY2": silver,
    "CATEGORY3": gold,
};

export const navigationIcons = {
    previous,
    next,
    vip,
};
