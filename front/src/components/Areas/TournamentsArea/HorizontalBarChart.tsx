"use client";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchTournaments } from '@/utils/fetchTournaments';
import { Roboto } from 'next/font/google';
import { ITournament } from '@/interfaces/interfaceTournaments';
import { IChartData } from '@/interfaces/interfaceChart';

Chart.register(...registerables);

const HorizontalBarChart: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const tournaments = await fetchTournaments();
      const pastTournaments = new Array(12).fill(0);
      const upcomingTournaments = new Array(12).fill(0);
      const currentDate = new Date();

      tournaments.forEach((tournament: ITournament) => {
        const startDate = new Date(tournament.startDate);
        const month = startDate.getMonth();
        if (startDate < currentDate) {
          pastTournaments[month] += 1;
        } else {
          upcomingTournaments[month] += 1;
        }
      });

      setData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Past Tournaments',
            data: pastTournaments,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: '#ff6f91',
            borderWidth: 2,
          },
          {
            label: 'Pending Tournaments',
            data: upcomingTournaments,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: '#00c9a7',
            borderWidth: 2,
          },
        ],
      });
    };

    loadData();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#301048',
          font: {
            family: 'Raleway',
            size: 16, 
          }, 
        },
      },
      title: {
        display: true,
        text: 'Tournaments Graphs',
        color: '#4b4453',
        font: {
          family: 'Raleway', // Cambia la fuente de la leyenda
          size: 24, // Cambia el tamaño de fuente de la leyenda
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#301048',
        },
      },
      y: {
        ticks: {
          color: '#301048',
        },
      },
    },
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center bg-white rounded-lg">
      <div className="w-full p-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;