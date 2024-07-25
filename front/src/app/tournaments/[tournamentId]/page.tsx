"use client";
import Link from 'next/link';
import Image from 'next/image';
import { banners } from '@/components/Home/LiveBanner';
import { data } from '@/components/Awards_Dates/Awards_Dates';
import { TournamentProps } from '@/interfaces/interfaceCards';
import { Awards_Dates } from '@/components/Awards_Dates/Awards_Dates';

const Tournament: React.FC<TournamentProps> = ({ params }) => {
  const { tournamentId } = params;
  const id = parseInt(tournamentId, 10);

  const tournament = banners.find(banner => banner.id === id);
  const tournamentData = data.find(item => item.id === id);

  if (!tournament || !tournamentData) {
    return <div>Tournament not found</div>;
  }

  return (
    <div className="flex flex-col">
      <Image
        src={tournament.image}
        alt={tournament.name}
        className="w-full max-h-500px"
      />
      <div className='bodyContainer mt-4 mb-12 grid grid-cols-2 gap-4'>
        <div>
          <h1 className='heading2 text-lightViolet'>Tournament {tournament.name}</h1>
          <Link className="buttonPrimary m-4" href={`/tournaments/${tournament.id}/register`}>
            Register
          </Link>
          <div className="flex flex-row justify-start gap-12 mt-6">
            <Image src={tournament.icon1} alt="Icon" className="icon" />
            <Image src={tournament.icon2} alt="Icon" className="icon" />
            <Image src={tournament.icon3} alt="Icon" className="icon" />
          </div>
          <p className='description text-2xl mt-6'>{tournament.description}</p>
        </div>
        <Awards_Dates data={tournamentData} />
      </div>
    </div>
  );
};

export default Tournament;