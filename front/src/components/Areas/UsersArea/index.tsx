"use client";
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import { IUser, IUserFilters } from '@/interfaces/interfaceUser';
import { fetchUsers, banUser, reactivateUser } from '@/utils/fetchUser';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import UsersPie from './UsersPie';
import { toast } from 'sonner';

const UsersArea: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<IUserFilters>({ nickname: '', tournaments: '', role: '', state: 'all' });
  const [userToBan, setUserToBan] = useState<string | null>(null);
  const [userToReactivate, setUserToReactivate] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState<string>('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await fetchUsers();
        const filteredUsers = allUsers
          .filter((user: { role: string; }) => user.role !== 'admin')
          .filter((user: { state: boolean; }) => {
            const stateMatch =
              filters.state === 'all' || // Muestra todos los usuarios
              (filters.state === 'active' && user.state) || // Muestra solo usuarios activos
              (filters.state === 'inactive' && !user.state); // Muestra solo usuarios inactivos
            return stateMatch;
          })
          .filter((user: { role: string; tournaments: string[]; }) => 
            (filters.role === '' || user.role === filters.role) &&
            (filters.tournaments === '' || 
              (filters.tournaments === 'inTournament' ? user.tournaments.length > 0 : 
                filters.tournaments === 'outTournament' ? user.tournaments.length === 0 : true))
          )
          .sort((a: { nickname: string; }, b: { nickname: string; }) => {
            if (filters.nickname === 'asc') {
              return a.nickname.localeCompare(b.nickname);
            } else if (filters.nickname === 'desc') {
              return b.nickname.localeCompare(a.nickname);
            } else {
              return 0;
            }
          });

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, [filters]);

  const handleFilter = (newFilters: IUserFilters) => {
    setFilters(newFilters);
  };

  const handleBanUser = (id: string) => {
    setUserToBan(id);
    setAction('ban');
    setShowConfirmModal(true);
  };

  const confirmBanUser = async () => {
    if (userToBan) {
      try {
        await banUser(userToBan);
        toast.success("User Banned Successfully", {
          position: "top-right",
          duration: 1500,
        });
        setUsers(users.map(user => user.id === userToBan ? { ...user, state: false } : user));
      } catch (error) {
        toast.error("Failed to ban user", {
          position: "top-right",
          duration: 1500,
        });
        console.error("Error banning user:", error);
      } finally {
        setShowConfirmModal(false);
        setUserToBan(null);
      }
    }
  };

  const handleReactiveUser = (id: string) => {
    setUserToReactivate(id);
    setAction('reactivate');
    setShowConfirmModal(true);
  };
  
  const confirmReactivateUser = async () => {
    if (userToReactivate) {
      try {
        await reactivateUser(userToReactivate); // Envia el id del user
        toast.success("User Reactivated Successfully", {
          position: "top-right",
          duration: 1500,
        });
        setUsers(users.map(user => user.id === userToReactivate ? { ...user, state: true } : user));
      } catch (error) {
        toast.error("Failed to reactivate user", {
          position: "top-right",
          duration: 1500,
        });
        console.error("Error reactivating user:", error);
      } finally {
        setShowConfirmModal(false);
        setUserToReactivate(null);
      }
    }
  };

  const [view, setView] = useState<string>('table');

  const cancelBanUser = () => {
    setShowConfirmModal(false);
    setUserToBan(null);
  };

  const activeUsers = users.filter(user => user.state).length;
  const inactiveUsers = users.filter(user => !user.state).length;
  const usersInTournament = users.filter(user => user.tournaments.length > 0).length;
  const usersOutTournament = users.filter(user => user.tournaments.length === 0).length;

  const handleChangeView = (view: string) => {
    setView(view);
  };

  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-4 mt-4">
          <button className={`buttonFilter ${view === "table" && "buttonFilterActive"}`} onClick={() => handleChangeView('table')}>Table</button>
          <button className={`buttonFilter ${view === "pie" && "buttonFilterActive"}`} onClick={() => handleChangeView('pie')}>Graphs</button>
        </div>
        {view === 'table' && (
          <div className='col-span-3'>
            <UsersList
              users={users}
              filters={filters}
              onFilter={handleFilter}
              onDeactivateUser={handleBanUser}
              onReactivateUser={handleReactiveUser}
            />
          </div>
        )}
        {view === 'pie' && (
          <div className='col-span-3'>
            <UsersPie
              activeUsers={activeUsers}
              inactiveUsers={inactiveUsers}
              usersInTournament={usersInTournament}
              usersOutTournament={usersOutTournament}
            />
          </div>
        )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        message={action === 'ban' ? "Are you sure you want to ban this User?" : "Are you sure you want to reactivate this User?"}
        onConfirm={action === 'ban' ? confirmBanUser : confirmReactivateUser}
        onCancel={cancelBanUser}
      />
    </>
  );
};

export default UsersArea;