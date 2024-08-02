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
  return (
  <div className="w-full overflow-hidden">
    <table className='rounded-lg mb-small overflow-hidden text-center bg-white text-BGdark'>
      <thead className='bg-cyan-300'>
        <UserFilters onFilter={onFilter} />
        <tr className='text-indigo-900'>
          <th>Nickname</th>
          <th>Role</th>
          <th>Tournament</th>
          <th>Ban User</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.nickname}</td>
            <td>{user.role}</td>
            <td>{user.tournaments.length > 0 ? 'In Tournament' : 'Out Tournament'}</td>
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