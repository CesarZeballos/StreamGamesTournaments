import { ITournament } from '@/interfaces/interfaceTournaments';
import { navigationIcons, gameIcons, categoryIcons, gameImages } from '@/utils/tournamentsData';
import { fetchTournamentById } from '@/utils/fetchTournaments';
import { Awards_Dates } from '../Awards_Dates/Awards_Dates';
import Image from 'next/image';
import Link from 'next/link';

interface DetailsProps {
  tournamentId: string;
}

const Details: React.FC<DetailsProps> = async ({ tournamentId }) => {
  const tournament = await fetchTournamentById(tournamentId);

  // Validar si tournament y tournament.game están definidos
  if (!tournament || !tournament.game || !tournament.game.name) {
    return <div className="loading">Tournament or game information not found</div>;
  }

  // Validar si los objetos gameImages, gameIcons y categoryIcons contienen las claves necesarias
  const gameImage = gameImages[tournament.game.name];
  const gameIcon = gameIcons[tournament.game.name];
  const categoryIcon = categoryIcons[tournament.category];

  if (!gameImage || !gameIcon || !categoryIcon) {
    return <div className="loading">Required images or icons not found</div>;
  }

  return (
    <>
      <Image
        src={gameImage}
        alt={tournament.nameTournament}
        className="w-full max-h-500px"
      />
      <div className="bodyContainer mt-small mb-medium grid grid-cols-2 gap-4 ">
        <div className="flex flex-col">
          <h1 className="heading2 text-lightViolet">{tournament.nameTournament}</h1>
          <Link className="buttonPrimary m-4" href={`/tournaments/${tournament.id}/register`}>
            Register
          </Link>
          <div className="flex flex-row justify-start gap-x-4 mt-6">
            <Image src={categoryIcon} alt="Category Icon" className="m-icon" />
            <Image src={gameIcon} alt="Game Icon" className="m-icon" />
            <Image src={navigationIcons.vip} alt="VIP Icon" className="m-icon" />
          </div>
          <p className="description text-2xl mt-6">{tournament.description}</p>
        </div>
          <Awards_Dates tournament={tournament} />
      </div>
    </>
  );
};

export default Details;