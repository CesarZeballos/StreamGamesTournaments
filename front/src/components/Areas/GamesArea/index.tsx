"use client";
import React, { useState, useEffect } from 'react';
import GamesList from './GamesList';
import { IGame, IGamesFilters } from '@/interfaces/interfaceTournaments';
import { fetchGames, fetchBanGame } from '@/utils/fetchTournaments';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { toast } from 'sonner';

const GamesArea: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [filters, setFilters] = useState<IGamesFilters>({ name: '', state: '' });
  const [gameToBan, setGameToBan] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  

  useEffect(() => {
    const loadGames = async () => {
      try {
        const allGames = await fetchGames();
        const filteredGames = allGames
          .filter((game: { role: string; }) => game.role !== 'admin')
          .filter((game: { role: string; tournaments: string[]; state: boolean; }) => 
            (filters.state === '' || game.state === (filters.state === 'true'))
          )
          .sort((a: { name: string; }, b: { name: string; }) => {
            if (filters.name === 'asc') {
              return a.name.localeCompare(b.name);
            } else if (filters.name === 'desc') {
              return b.name.localeCompare(a.name);
            } else {
              return 0;
            }
          });

        setGames(filteredGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    loadGames();
  }, [filters]);

  const handleFilter = (newFilters: IGamesFilters) => {
    setFilters(newFilters);
  };

  const handleBanGame = (id: string) => {
    setGameToBan(id);
    setShowConfirmModal(true);
  };

  const confirmBanGame = async () => {
    if (gameToBan) {
      try {
        await fetchBanGame(gameToBan);
        toast.success("Game Banned Successfully", {
          position: "top-right",
          duration: 1500,
        });
        setGames(games.map(game => game.id === gameToBan ? { ...game, state: false } : game));
      } catch (error) {
        toast.error("Failed to ban game", {
          position: "top-right",
          duration: 1500,
        });
        console.error("Error banning game:", error);
      } finally {
        setShowConfirmModal(false);
        setGameToBan(null);
      }
    }
  };

  const [view, setView] = useState<string>('table');

  const cancelBanGame = () => {
    setShowConfirmModal(false);
    setGameToBan(null);
  };

  const activeGames = games.filter(game => game.state).length;
  const inactiveGames = games.filter(game => !game.state).length;

  const handleChangeView = (view: string) => {
    setView(view);
  };


  return (
    <>
      <div>
        <h1 className="heading5 text-lightViolet">Games</h1>
            <div className="flex flex-row w-full items-center justify-around mt-4">
          <button className='buttonFilter' onClick={() => handleChangeView('table')}>Table</button>
          <button className='buttonFilter' onClick={() => handleChangeView('pie')}>Graphs</button>

        </div>
        {view === 'table' && (
          <div className='col-span-3'>
            <h1 className='label text-start text-lightViolet mb-small'>Games table</h1>
            <GamesList
              games={games}
              filters={filters}
              onFilter={handleFilter}
              onDeactivateGame={handleBanGame}
            />
          </div>
          )}
      </div>


      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to ban this Game?"
        onConfirm={confirmBanGame}
        onCancel={cancelBanGame}
      />
    </>
  );
};

export default GamesArea;