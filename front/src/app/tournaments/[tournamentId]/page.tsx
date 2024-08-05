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
import { CategoryIcon, GameIcon, PriceIcon } from '@/components/Tournaments/type';
import { isoToDate } from '@/utils/formatDate';

const TournamentPage: React.FC<{ params: { tournamentId: string } }> = ({ params }) => {
  const router = useRouter();
  const allTournament = useSelector((state: RootState) => state.tournament.tournaments);
  const tournamentId = params.tournamentId;
  const tournament = allTournament.find((tournament: { id: string; }) => tournament.id === tournamentId);
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
    <div className='w-full h-96 overflow-hidden'>
      <Image
          src={gameImage}
          alt={tournament.nameTournament}
          className="object-cover"
        />
    </div>
      <div className='bodyContainer mb-medium grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='heading2 text-lightViolet'>{tournament.nameTournament}</h1>
          <button className='buttonPrimary' onClick={handleClick}>Register</button>
          
          <div className="flex flex-row gap-6">
            <div className="flex flex-row items-center gap-4">
              <CategoryIcon category={tournament.category} />
              <p className='body text-white text-2xl'>{tournament.category}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <GameIcon game={tournament.game.name} />
              <p className='body text-white text-2xl'>{tournament.game.name}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <PriceIcon price={tournament.price} />
              <p className='body text-white text-2xl'>U$S {tournament.price}</p>
            </div>
            </div>

          <p className='body text-white text-2xl mt-6'>{tournament.description}</p>
          
        </div>
          <Awards_Dates tournament={tournament} />
        </div>
      </>
  );
};

export default TournamentPage;
