import { Categories } from '@prisma/client';

export const tournaments = [
  {
    id: 'uuid-1',
    nameTournament: 'Strike Showdown',
    startDate: new Date('2024-08-25T14:23:11.438Z'),
    createdAt: new Date('2023-01-05T08:21:45.438Z'),
    category: Categories.Beginner,
    awards: ['$500', '$400', '$200'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 5000,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-2',
    nameTournament: 'Fortnite Frenzy',
    startDate: new Date('2024-09-11T10:15:32.438Z'),
    createdAt: new Date('2023-02-14T12:34:56.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1500,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'e2c4a4d2-8f7b-4f23-8b6f-3d0a6cfec4b3',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-3',
    nameTournament: 'Legends Clash',
    startDate: new Date('2024-10-21T18:27:43.438Z'),
    createdAt: new Date('2023-03-23T15:45:07.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 550,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-4',
    nameTournament: 'CS:GO Open',
    startDate: new Date('2024-11-05T11:23:54.438Z'),
    createdAt: new Date('2023-04-12T16:56:18.438Z'),
    category: Categories.Beginner,
    awards: ['$500', '$400', '$200'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 2500,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-5',
    nameTournament: 'Battle Royale Show',
    startDate: new Date('2024-12-15T09:34:05.438Z'),
    createdAt: new Date('2023-05-07T10:07:29.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 950,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'e2c4a4d2-8f7b-4f23-8b6f-3d0a6cfec4b3',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd",
      "d4e5f6g7-8901-23de-fg45-567890abcdef"
    ]

  },
  {
    id: 'uuid-6',
    nameTournament: 'Legends Battle',
    startDate: new Date('2024-07-25T16:45:16.438Z'),
    createdAt: new Date('2023-06-18T11:18:40.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1050,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-7',
    nameTournament: 'CS:GO Arena',
    startDate: new Date('2024-08-05T14:56:27.438Z'),
    createdAt: new Date('2023-07-01T12:29:51.438Z'),
    category: Categories.Beginner,
    awards: ['$450', '$300', '$250'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 250,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-8',
    nameTournament: 'Fortnite Brawl',
    startDate: new Date('2024-09-15T17:07:38.438Z'),
    createdAt: new Date('2023-08-22T13:40:02.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 550,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'e2c4a4d2-8f7b-4f23-8b6f-3d0a6cfec4b3',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-9',
    nameTournament: 'Legends Rumble',
    startDate: new Date('2024-10-25T19:18:49.438Z'),
    createdAt: new Date('2023-09-13T14:51:13.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1350,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-10',
    nameTournament: 'CS:GO Showdown',
    startDate: new Date('2024-11-30T11:22:33.438Z'),
    createdAt: new Date('2023-10-01T14:20:12.438Z'),
    category: Categories.Beginner,
    awards: ['$450', '$300', '$250'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 750,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd",
      "c3d4e5f6-7890-12cd-ef34-4567890abcde"
    ]

  },
  {
    id: 'uuid-11',
    nameTournament: 'Legends Arena',
    startDate: new Date('2024-12-05T15:44:55.438Z'),
    createdAt: new Date('2023-11-05T13:30:22.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1550,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-12',
    nameTournament: 'Fortnite Clash',
    startDate: new Date('2024-12-10T18:56:17.438Z'),
    createdAt: new Date('2023-12-02T14:45:33.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1550,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'e2c4a4d2-8f7b-4f23-8b6f-3d0a6cfec4b3',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-13',
    nameTournament: 'CounterStrike Battle',
    startDate: new Date('2024-12-15T20:08:39.438Z'),
    createdAt: new Date('2023-12-15T16:51:44.438Z'),
    category: Categories.Beginner,
    awards: ['$500', '$400', '$200'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1050,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-14',
    nameTournament: 'League of Champions',
    startDate: new Date('2024-12-20T22:20:01.438Z'),
    createdAt: new Date('2023-12-25T18:57:55.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1250,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
  {
    id: 'uuid-15',
    nameTournament: 'Fortnite Fury',
    startDate: new Date('2024-12-25T14:32:23.438Z'),
    createdAt: new Date('2023-12-30T20:13:06.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1850,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'e2c4a4d2-8f7b-4f23-8b6f-3d0a6cfec4b3',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-16',
    nameTournament: 'Legends of Valor',
    startDate: new Date('2024-12-30T15:44:45.438Z'),
    createdAt: new Date('2023-12-18T19:24:17.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1750,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-17',
    nameTournament: 'Strike Force',
    startDate: new Date('2025-01-05T10:55:07.438Z'),
    createdAt: new Date('2024-01-02T20:32:28.438Z'),
    category: Categories.Beginner,
    awards: ['$500', '$400', '$200'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 950,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-18',
    nameTournament: 'League Masters',
    startDate: new Date('2025-01-10T17:07:29.438Z'),
    createdAt: new Date('2024-01-10T14:51:39.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1450,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-19',
    nameTournament: 'Fortnite Legends',
    startDate: new Date('2025-01-15T20:19:51.438Z'),
    createdAt: new Date('2024-01-15T19:15:50.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1350,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: []

  },
  {
    id: 'uuid-20',
    nameTournament: 'Valor Champions',
    startDate: new Date('2025-01-20T14:32:12.438Z'),
    createdAt: new Date('2024-01-20T15:57:06.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1650,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-21',
    nameTournament: 'Strike Showdown',
    startDate: new Date('2025-01-25T17:44:34.438Z'),
    createdAt: new Date('2024-01-25T18:28:17.438Z'),
    category: Categories.Beginner,
    awards: ['$500', '$400', '$200'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1050,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd",
      "c3d4e5f6-7890-12cd-ef34-4567890abcde"
    ]

  },
  {
    id: 'uuid-22',
    nameTournament: 'Fortnite Frenzy',
    startDate: new Date('2025-01-30T12:08:46.438Z'),
    createdAt: new Date('2024-01-30T17:20:28.438Z'),
    category: Categories.Advanced,
    awards: ['$900', '$700', '$600'],
    description: "Jump into the action in this vibrant battle royale, build structures, outmaneuver your opponents and be the last one standing in an ever-changing world, filled with unpredictable challenges and ever-evolving gameplay experiences.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951339/fortnite_se4taz.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1450,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'e2c4a4d2-8f7b-4f23-8b6f-3d0a6cfec4b3',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd",
      "c3d4e5f6-7890-12cd-ef34-4567890abcde"
    ]

  },
  {
    id: 'uuid-23',
    nameTournament: 'League Dominion',
    startDate: new Date('2025-02-05T10:32:58.438Z'),
    createdAt: new Date('2024-02-01T20:13:06.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1850,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-24',
    nameTournament: 'CS:GO Dominators',
    startDate: new Date('2025-02-10T16:56:10.438Z'),
    createdAt: new Date('2024-02-05T16:57:30.438Z'),
    category: Categories.Beginner,
    awards: ['$500', '$400', '$200'],
    description: "Join the battle in this exciting team strategy game, where skills and tactics determine victory in epic 5v5 combat, requiring precise coordination, sharp reflexes, and a deep understanding of team dynamics for success.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951332/csgo_mumbrh.jpg',
    membersNumber: 5,
    maxTeams: 4,
    price: 1250,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: '7e84c4b2-5b2d-4f88-9a6d-6f6b19c88d3e',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab"
    ]

  },
  {
    id: 'uuid-25',
    nameTournament: 'League of Heroes',
    startDate: new Date('2025-02-15T20:19:51.438Z'),
    createdAt: new Date('2024-02-15T19:15:50.438Z'),
    category: Categories.Expert,
    awards: ['$1900', '$1300', '$1500'],
    description: "Master the Rift in this fast-paced strategy game, where champions clash in a fight for supremacy, demanding keen strategy, flawless execution, and a deep knowledge of the game’s diverse characters and mechanics.",
    urlAvatar: 'https://res.cloudinary.com/dofwlsemg/image/upload/v1722951355/lol_dfz0bt.png',
    membersNumber: 5,
    maxTeams: 4,
    price: 1550,
    organizerId: "b1c9e5d4-5f94-41b3-9e40-4d42b6a4b382",
    gameId: 'f4b9a5d2-0a9c-4c89-96b1-3d0e7f6a1e8b',
    teams: [
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "b2c3d4e5-6789-01bc-def2-34567890abcd"
    ]

  },
];
