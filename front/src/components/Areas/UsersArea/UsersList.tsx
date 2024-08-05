"use client";
import React from 'react';
import UserFilters from './UserFilters';
import { IUser, IUserFilters } from '@/interfaces/interfaceUser';

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
    <div className="w-full overflow-hidden">
      <table className='rounded-lg mb-small overflow-hidden text-center bg-white text-BGdark'>
        <thead className='bg-cyan-300'>
          <UserFilters onFilter={onFilter} />
          <tr className='text-indigo-900'>
            <th>Nickname</th>
            <th>Role</th>
            <th>Tournament</th>
            <th>State</th>
            <th>Ban User</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.nickname}</td>
              <td>{user.role}</td>
              <td>{user.tournaments.length > 0 ? 'In Tournament' : 'Out Tournament'}</td>
              <td>{user.state ? 'Active' : 'Inactive'}</td>
              <td>
                <button className='hover:bg-softViolet p-2 rounded-lg' onClick={() => onDeactivateUser(user.id)}>Ban User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;