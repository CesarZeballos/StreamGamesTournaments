'use client';
import { ITournament } from '@/interfaces/interfaceTournaments';
import Link from 'next/link';
import Image from 'next/image';
import { Awards_Dates } from '@/components/Awards_Dates/Awards_Dates';
import { fetchTournamentById } from '@/utils/fetchTournaments';
import { navigationIcons, gameIcons, categoryIcons, gameImages } from '@/utils/tournamentsData';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'sonner';

const TournamentPage: React.FC<{ params: { tournamentId: string } }> = ({ params }) => {
  const router = useRouter();
  const allTournament = useSelector((state: RootState) => state.tournament.tournaments);
  const tournamentId = params.tournamentId;
  const tournament = allTournament.find((tournament) => tournament.id === tournamentId);
  const token = useSelector((state: RootState) => state.user.token);

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  const gameImage = gameImages[tournament.game.name];
  const gameIcon = gameIcons[tournament.game.name];
  const categoryIcon = categoryIcons[tournament.category];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(token) {
      router.push(`/tournaments/${tournament.id}/register`);
    } else {
      toast.error('You must be logged in to register for the tournament', {
        position: 'top-right', 
        duration: 1500,
        action: {
          label: 'Go to login page',
          onClick: () => router.push('/login'),
        },
      });
    }
  }

  return (
    <>
    <Image
        src={gameImage}
        alt={tournament.nameTournament}
        className="w-full max-h-500px"
      />
      <div className='bodyContainer mt-medium mb-medium grid grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <h1 className='heading2 text-lightViolet'>Tournament {tournament.nameTournament}</h1>
          <button className='buttonPrimary mt-4' onClick={handleClick}>Register</button>
          <div className="flex flex-row justify-start gap-x-4 mt-6">
            <Image src={categoryIcon} alt="Icon" className="m-icon" />
            <Image src={gameIcon} alt="Icon" className="m-icon" />
            <Image src={navigationIcons.vip} alt="Icon" className="m-icon" />
          </div>
          <p className='description text-2xl mt-6'>{tournament.description}</p>
          </div>
      <Awards_Dates tournament={tournament} />
      </div>
      </>
  );
};

export default TournamentPage;