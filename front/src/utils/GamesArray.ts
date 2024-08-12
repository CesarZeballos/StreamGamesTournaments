import { IGame } from "@/interfaces/interfaceTournaments";

export const banners: IGame[] = [
    {
		id: 'game1-uuid',
		name: 'Fortnite',
		urlImage: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
        description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
		state: true
	},
	{
		id: 'game2-uuid',
		name: 'CounterStrike Go',
		urlImage: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
        description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
		state: true
	},
	{
		id: 'game3-uuid',
		name: 'League of Legends',
		urlImage: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
        description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
		state: true
	},
	{
		id: 'game4-uuid',
		name: 'PUBG',
		urlImage: '',
        description: "Come and watch a player versus player shooter game in which up to one hundred players fight in a battle royale, a type of large-scale last man standing deathmatch where players fight to remain the last alive.",
		state: true
	},
	{
		id: 'game5-uuid',
		name: 'Valorant',
		urlImage: '',
        description: "Don't forget the great shooting game formed by two teams of five, where one team attacks and the other defends. Players control characters known as agents, who have different abilities to use to achieve victory in the game.",
		state: true
	},
]