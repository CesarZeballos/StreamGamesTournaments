"use client";
import React, { useState } from 'react';
import { IUserFilters } from '@/interfaces/interfaceUser';

interface UserFiltersProps {
  onFilter: (filters: IUserFilters) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<IUserFilters>({ nickname: '', tournaments: '', role: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const filterValue: string = name === 'inTournament' ? value : value;

    const updatedFilters = {
      ...filters,
      [name]: filterValue
    };

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <tr className='bg-indigo-200 text-indigo-900'>
      <td>
        <select name="nickname" value={filters.nickname} className='filter' onChange={handleFilterChange}>
          <option value="">Sort by Nickname</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </td>
      <td>
        <select name="role" value={filters.role} className='filter' onChange={handleFilterChange}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
      </td>
      <td>
        <select name="tournaments" value={filters.tournaments} className='filter' onChange={handleFilterChange}>
          <option value="">All Users</option>
          <option value="true">In Tournament</option>
          <option value="false">Without Tournament</option>
        </select>
      </td>
      <td>Ban</td>
    </tr>
  );
};

export default UserFilters;
