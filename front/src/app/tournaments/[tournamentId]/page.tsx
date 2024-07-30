import Details from '@/components/Details/Details';

interface PageProps {
  params: {
    tournamentId: string;
  };
}

const TournamentPage: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <Details tournamentId={params.tournamentId} />
    </div>
  );
};

export default TournamentPage;
