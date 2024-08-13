import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchTournamentVersus } from './tournament.action';
import VersusList from './versus.list';
import { createVersus, updateWinnerRound } from './versus.fetchs'

interface TournamentPageProps {
  tournamentId: string;
}

const TournamentPage: React.FC<TournamentPageProps> = ({ tournamentId }) => {
  const dispatch = useDispatch();
  const { versus, loading } = useSelector((state: RootState) => state.tournament);

  useEffect(() => {
    dispatch(fetchTournamentVersus(tournamentId));
  }, [dispatch, tournamentId]);

  const handleCreateVersus = async () => {
    await createVersus(tournamentId);
    dispatch(fetchTournamentVersus(tournamentId));
  };

  const handleWinnerSelect = async (versusId: string, winnerId: string) => {
    await updateWinnerRound(versusId, winnerId);
    dispatch(fetchTournamentVersus(tournamentId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tournament Battles</h1>
      <button onClick={handleCreateVersus}>Create Versus</button>
      <VersusList 
        versus={versus} 
        onWinnerSelect={handleWinnerSelect} 
      />
    </div>
  );
};

export default TournamentPage;
