import { Categories } from "@prisma/client";

export const tournaments = [
	{
		id: 'd1f5d4e7-9b64-4d39-aebd-f76980d72f3e',
		startDate: new Date('2024-08-01T14:23:11.438Z'),
		createdAt: new Date('2023-01-05T08:21:45.438Z'),
		nameTournament: "tournament1",
		categories: Categories.beginner,
		award: ["$500", "$1000", "$1500"],
		description: 'Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.',
		urlAvatar: 'https://example.com/stream1',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game1-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p',
		startDate: new Date('2024-09-11T10:15:32.438Z'),
		createdAt: new Date('2023-02-14T12:34:56.438Z'),
		nameTournament: "tournament2",
		categories: Categories.advanced,
		award: ["$500", "$1000", "$1500"],
		description: "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
		urlAvatar: 'https://example.com/stream2',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game2-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q',
		startDate: new Date('2024-10-21T18:27:43.438Z'),
		createdAt: new Date('2023-03-23T15:45:07.438Z'),
		nameTournament: "tournament3",
		categories: Categories.expert,
		award: ["$500", "$1000", "$1500"],
		maxMember: 5,
		maxTeam: 4,
		description: "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
		urlAvatar: 'https://example.com/stream3',
		organizerId: 'user2-uuid',
		gameId: 'game3-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r',
		startDate: new Date('2024-11-05T11:23:54.438Z'),
		createdAt: new Date('2023-04-12T16:56:18.438Z'),
		nameTournament: "tournament4",
		categories: Categories.beginner,
		award: ["$500", "$1000", "$1500"],
		description: 'Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.',
		urlAvatar: 'https://example.com/stream4',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game1-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'd5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s',
		startDate: new Date('2024-12-15T09:34:05.438Z'),
		createdAt: new Date('2023-05-07T10:07:29.438Z'),
		nameTournament: "tournament5",
		categories: Categories.advanced,
		award: ["$500", "$1000", "$1500"],
		description: "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
		urlAvatar: 'https://example.com/stream5',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game2-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t',
		startDate: new Date('2024-07-25T16:45:16.438Z'),
		createdAt: new Date('2023-06-18T11:18:40.438Z'),
		nameTournament: "tournament6",
		categories: Categories.expert,
		award: ["$500", "$1000", "$1500"],
		description: "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
		urlAvatar: 'https://example.com/stream6',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game3-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u',
		startDate: new Date('2024-08-05T14:56:27.438Z'),
		createdAt: new Date('2023-07-01T12:29:51.438Z'),
		nameTournament: "tournament7",
		categories: Categories.beginner,
		award: ["$500", "$1000", "$1500"],
		description: "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
		urlAvatar: 'https://example.com/stream7',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game1-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v',
		startDate: new Date('2024-09-15T17:07:38.438Z'),
		createdAt: new Date('2023-08-22T13:40:02.438Z'),
		nameTournament: "tournament8",
		categories: Categories.advanced,
		award: ["$500", "$1000", "$1500"],
		description: 'Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.',
		urlAvatar: 'https://example.com/stream8',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game2-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w',
		startDate: new Date('2024-10-25T19:18:49.438Z'),
		createdAt: new Date('2023-09-13T14:51:13.438Z'),
		nameTournament: "tournament9",
		categories: Categories.expert,
		award: ["$500", "$1000", "$1500"],
		description: "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
		urlAvatar: 'https://example.com/stream9',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game3-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
	{
		id: 'i0j1k2l3-4m5n-6o7p-8q9r-0s1t2u3v4w5x',
		startDate: new Date('2024-11-30T21:29:00.438Z'),
		createdAt: new Date('2023-10-24T15:02:24.438Z'),
		nameTournament: "tournament10",
		categories: Categories.beginner,
		award: ["$500", "$1000", "$1500"],
		description: "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
		urlAvatar: 'https://example.com/stream10',
		maxMember: 5,
		maxTeam: 4,
		organizerId: 'user2-uuid',
		gameId: 'game1-uuid',
		teams: [
			'team1-uuid,team2-uuid,team4-uuid,team3-uuid'
		],
	},
];
