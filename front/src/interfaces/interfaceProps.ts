import { StaticImageData } from "next/image";

type ImageSource = StaticImageData | string;

export interface IPropForm {
    children: React.ReactNode;
    section: string;
    image?: string | ImageSource;
}

export interface IPropContainer {
    children: React.ReactNode;
    imagen: string;
    URLimagen: string
}

export interface IProps {
    children: React.ReactNode;
}