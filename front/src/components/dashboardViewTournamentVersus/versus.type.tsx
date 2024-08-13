export interface Team {
  id: string;
  name: string;
}

export interface Versus {
  id: string;
  team1: Team;
  team2: Team;
}
