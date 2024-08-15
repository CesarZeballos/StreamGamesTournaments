"use client";
import React from 'react';
import UserFilters from './UserFilters';
import { IUser, IUserFilters } from '@/interfaces/interfaceUser';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface UsersListProps {
  users: IUser[];
  filters: IUserFilters;
  onFilter: (filters: IUserFilters) => void;
  onDeactivateUser: (id: string) => void;
  onReactivateUser: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, filters, onFilter, onDeactivateUser, onReactivateUser }) => {
  const filteredUsers = users
    .filter(user => {
      const hasTournaments = user.tournaments.length > 0; // Considera `notifications` como el indicador de torneos

      // Filtro por estado
      const stateMatch =
        filters.state === 'all' || // Muestra todos los usuarios
        (filters.state === 'active' && user.state) || // Muestra solo usuarios activos
        (filters.state === 'inactive' && !user.state); // Muestra solo usuarios inactivos

      // Filtro por rol
      const roleMatch =
        filters.role === '' || user.role === filters.role;

      // Filtro por torneos
      const tournamentsMatch =
        filters.tournaments === '' || // Muestra todos los usuarios
        (filters.tournaments === 'inTournament' && hasTournaments) || // Muestra solo usuarios en torneos
        (filters.tournaments === 'outTournament' && !hasTournaments); // Muestra solo usuarios fuera de torneos

      return stateMatch && roleMatch && tournamentsMatch;
    })
    .sort((a, b) => {
      if (filters.nickname === 'asc') {
        return a.nickname.localeCompare(b.nickname);
      } else if (filters.nickname === 'desc') {
        return b.nickname.localeCompare(a.nickname);
      }
      return 0;
    });

  return (
    <div>
      <table className='w-full'>
        <thead className='tableHeader flex flex-row justify-around'>
          <th className='text-center w-36'>Nickname</th>
          <th className='text-center w-36'>Role</th>
          <th className='text-center w-36'>Tournament</th>
          <th className='text-center w-36'>State</th>
          <th className='text-center w-36'>Ban User</th>
        </thead>
        <UserFilters onFilter={onFilter} />
        <tbody className="tableBody flex flex-col gap-2">
          {filteredUsers.map(user => (
            <tr className="flex flex-row justify-around" key={user.id}>
              <td className='text-center w-36'>{user.nickname}</td>
              <td className='text-center w-36'>{user.role}</td>
              <td className='text-center w-36'>{user.tournaments.length > 0 ? 'In Tournament' : 'Out Tournament'}</td>
              <td className='text-center w-36'>{user.state ? 'Active' : 'Inactive'}</td>
              <td className="text-center w-36">
                {user.state ? (
                  <button
                    className="iconButton"
                    onClick={() => onDeactivateUser(user.id)}
                  >
                    <BlockIcon />
                  </button>
                ) : (
                  <button
                    className="iconButton"
                    onClick={() => onReactivateUser(user.id)}
                  >
                    <CheckCircleIcon />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;