import { ITournament } from '@/interfaces/interfaceTournaments';
import Link from 'next/link';
import Image from 'next/image';
import { Awards_Dates } from '@/components/Awards_Dates/Awards_Dates';
import { fetchTournamentById } from '@/utils/fetchTournaments';
import { name, navigationIcons, gameIcons, games, categoryIcons, description } from '@/utils/tournamentsData';

interface TournamentPageProps {
  tournament: ITournament | null;
}

const tournamentIds = Object.keys(games);

async function getTournament(tournamentId: string): Promise<ITournament | null> {
  return fetchTournamentById(tournamentId);
}

export async function generateMetadata({ params }: { params: { tournamentId: string } }) {
  const tournament = await getTournament(params.tournamentId);
  return {
    title: tournament ? tournament.name : 'Tournament Not Found',
  };
}

export async function generateStaticParams() {
  return tournamentIds.map(id => ({ tournamentId: id }));
}

const TournamentPage: React.FC<{ params: { tournamentId: string } }> = async ({ params }) => {
  const tournament = await getTournament(params.tournamentId);

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  const backgroundImage = games[tournament.id];
  const gameIcon = gameIcons[tournament.id];
  const categoryIcon = categoryIcons[tournament.categories];
  const tournamentName = name[tournament.id] || "Unknown Tournament";
  const tournamentDescription = description[tournament.id] || "No description available";

  return (
    <>
    <Image
        src={backgroundImage}
        alt={tournamentName}
        className="w-full max-h-500px"
      />
      <div className='bodyContainer mt-medium mb-medium grid grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <h1 className='heading2 text-lightViolet'>Tournament {tournamentName}</h1>
          <Link className="buttonPrimary m-4" href={`/tournaments/${tournament.id}/register`}>
            Register
          </Link>
          <div className="flex flex-row justify-start gap-x-4 mt-6">
            <Image src={categoryIcon} alt="Icon" className="m-icon" />
            <Image src={gameIcon} alt="Icon" className="m-icon" />
            <Image src={navigationIcons.vip} alt="Icon" className="m-icon" />
          </div>
          <p className='description text-2xl mt-6'>{tournamentDescription}</p>
          </div>
      <Awards_Dates tournament={tournament} />
      </div>
      </>
  );
};

export default TournamentPage;