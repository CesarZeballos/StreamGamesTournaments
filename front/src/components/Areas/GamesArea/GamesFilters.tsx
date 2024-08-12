"use client";
import React, { useState } from 'react';
import { IGamesFilters } from '@/interfaces/interfaceTournaments';

interface GamesFiltersProps {
  onFilter: (filters: IGamesFilters) => void;
}

const GamesFilters: React.FC<GamesFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<IGamesFilters>({ name: '', state: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const filterValue = name === 'state' || name === 'name' ? value : value;

    const updatedFilters = {
      ...filters,
      [name]: filterValue
    };

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <tr className='flex flex-row justify-around mb-4'>
      <td className='text-center w-36'>
        <select name="name" value={filters.name} className='filter' onChange={handleFilterChange}>
          <option value="">Sort by Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </td>
      <td className='text-center w-36'>
        <select name="state" value={filters.state} className='filter' onChange={handleFilterChange}>
          <option value="">All Games</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </td>
      <td className='text-center text-white w-36'>Ban</td>
    </tr>
  );
};

export default GamesFilters;