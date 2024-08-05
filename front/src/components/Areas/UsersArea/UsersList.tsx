"use client";
import React from 'react';
import UserFilters from './UserFilters';
import { IUser, IUserFilters } from '@/interfaces/interfaceUser';
import BlockIcon from '@mui/icons-material/Block';

interface UsersListProps {
  users: IUser[];
  filters: IUserFilters;
  onFilter: (filters: IUserFilters) => void;
  onDeactivateUser: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, filters, onFilter, onDeactivateUser }) => {
  const filteredUsers = users
    .filter(user => 
      filters.state === '' || 
      filters.state === undefined || 
      user.state === (filters.state === 'true')
    )
    .filter(user => 
      filters.role === '' || user.role === filters.role
    )
    .filter(user => 
      filters.tournaments === '' || 
      (filters.tournaments === 'true' ? user.tournaments.length > 0 : 
      filters.tournaments === 'false' ? user.tournaments.length === 0 : 
      true)
    );

  const sortedUsers = filteredUsers.sort((a, b) => {
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
          {sortedUsers.map(user => (
            <tr className="flex flex-row justify-around" key={user.id}>
              <td className='text-center w-36'>{user.nickname}</td>
              <td className='text-center w-36'>{user.role}</td>
              <td className='text-center w-36'>{user.tournaments.length > 0 ? 'In Tournament' : 'Out Tournament'}</td>
              <td className='text-center w-36'>{user.state ? 'Active' : 'Inactive'}</td>
              <td className='text-center w-36'>
                <button className='iconButton' onClick={() => onDeactivateUser(user.id)}><BlockIcon />  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;