"use client";
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import { IUser, IUserFilters } from '@/interfaces/interfaceUser';
import { fetchUsers } from '@/utils/fetchUser';

const MainComponent: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<IUserFilters>({ nickName: '', inTournament: '', role: '' });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await fetchUsers();

        // Filtrar usuarios según los filtros aplicados
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

        // Ordenar usuarios según el filtro de nickName
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

  const handleDeactivateUser = (id: string) => {
    console.log("Deactivating user with id:", id);
  };

  return (
    <>
      <h1 className='heading3 text-center text-lightViolet mb-small'>Users Manage</h1>
      <UsersList
        users={users}
        filters={filters}
        onFilter={handleFilter}
        onDeactivateUser={handleDeactivateUser}
      />
    </>
  );
};

export default MainComponent;