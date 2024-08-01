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
    <table className='rounded-lg mb-small overflow-hidden text-center bg-lightViolet text-BGdark'>
      <thead className='bg-cyan-300'>
        <UserFilters onFilter={onFilter} />
        <tr className='text-indigo-900'>
          <th>NickName</th>
          <th>Role</th>
          <th>Tournament</th>
          <th>Ban User</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.nickName}</td>
            <td>{user.role}</td>
            <td>{user.tournaments.length > 0 ? 'In Tournament' : 'Out Tournament'}</td>
            <td>
              <button onClick={() => onDeactivateUser(user.id)}>Ban User</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;