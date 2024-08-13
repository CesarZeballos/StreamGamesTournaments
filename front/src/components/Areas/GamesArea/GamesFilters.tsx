"use client";
import React, { useState } from 'react';
import { IGamesFilters } from '@/interfaces/interfaceTournaments';

interface GamesFiltersProps {
  onFilter: (filters: IGamesFilters) => void;
}

const GamesFilters: React.FC<GamesFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<IGamesFilters>({ name: '', state: 'all' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Ajusta el valor de estado para 'active' y 'inactive'
    const filterValue = name === 'state'
      ? value === 'active'
        ? 'active'
        : value === 'inactive'
          ? 'inactive'
          : 'all' // 'all' para mostrar todos los juegos
      : value;

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
          <option value="all">All Games</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>
      <td className='text-center text-white w-36'>Ban</td>
    </tr>
  );
};

export default GamesFilters;