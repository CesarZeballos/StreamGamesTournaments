"use client";
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import { IUser, IUserFilters } from '@/interfaces/interfaceUser';
import { fetchUsers, banUser } from '@/utils/fetchUser';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import UsersPie from './UsersPie';

const UsersArea: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<IUserFilters>({ nickName: '', inTournament: '', role: '' });
  const [userToBan, setUserToBan] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await fetchUsers();
        const filteredUsers = allUsers
          .filter((user: { role: string; }) => user.role !== 'admin')
          .filter((user: { role: string; tournaments: string | any[]; }) => {
            return (
              (filters.role === '' || user.role === filters.role) &&
              (filters.inTournament === '' ||
                (filters.inTournament === 'true' ? user.tournaments.length > 0 :
                  filters.inTournament === 'false' ? user.tournaments.length === 0 : true))
            );
          });
        const sortedUsers = filteredUsers.sort((a: { nickName: string; }, b: { nickName: string; }) => {
          if (filters.nickName === 'asc') {
            return a.nickName.localeCompare(b.nickName);
          } else if (filters.nickName === 'desc') {
            return b.nickName.localeCompare(a.nickName);
          } else {
            return 0;
          }
        });

        setUsers(sortedUsers);
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
    setShowConfirmModal(true);
  };

  const confirmBanUser = async () => {
    if (userToBan) {
      try {
        await banUser(userToBan);
        alert("User Banned Successfully");
        setUsers(users.filter(user => user.id !== userToBan));
      } catch (error) {
        alert("Failed to ban user");
        console.error("Error banning user:", error);
      } finally {
        setShowConfirmModal(false);
        setUserToBan(null);
      }
    }
  };

  const cancelBanUser = () => {
    setShowConfirmModal(false);
    setUserToBan(null);
  };

  const activeUsers = users.filter(user => user.state).length;
  const inactiveUsers = users.filter(user => !user.state).length;
  const usersInTournament = users.filter(user => user.tournaments.length > 0).length;
  const usersOutTournament = users.filter(user => user.tournaments.length === 0).length;

  return (
    <>
      <h1 className='heading3 text-center text-lightViolet mb-small'>Users Manage</h1>
      <UsersList
        users={users}
        filters={filters}
        onFilter={handleFilter}
        onDeactivateUser={handleBanUser}
      />
      <UsersPie
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        usersInTournament={usersInTournament}
        usersOutTournament={usersOutTournament}
      />
      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to ban this user?"
        onConfirm={confirmBanUser}
        onCancel={cancelBanUser}
      />
    </>
  );
};

export default UsersArea;