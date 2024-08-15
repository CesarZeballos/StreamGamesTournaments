"use client";
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface UserPieProps {
  activeUsers: number;
  inactiveUsers: number;
  usersInTournament: number;
  usersOutTournament: number;
}

const UsersPie: React.FC<UserPieProps> = ({ activeUsers, inactiveUsers, usersInTournament, usersOutTournament }) => {
  const [series, setSeries] = useState([activeUsers, inactiveUsers, usersInTournament, usersOutTournament]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'pie' as const,
    },
    labels: ['Active Users', 'Inactive Users', 'Users In Tournament', 'Users Out Tournament'],
    colors: ['#3f51ff', '#EE00EE', '#7e39b7', '#301048'],
    legend: {
      position: 'right',
      fontSize: '18px',
      offsetX: 0,
      offsetY: 50,
      labels: {
        colors: '#000',
        useSeriesColors: false,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 10
      }
    },
    responsive: [
      {
        breakpoint: 1024, // Ajusta el breakpoint según tus necesidades
        options: {
          chart: {
            width: '150%' // Ajusta el ancho del gráfico para pantallas más pequeñas
          },
          legend: {
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
            fontSize: '14px',
            itemMargin: {
              horizontal: 10,
              vertical: 10
            }
          }
        }
      },
      {
        breakpoint: 768, // Puedes agregar más breakpoints si lo necesitas
        options: {
          chart: {
            width: '130%'
          },
          legend: {
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
            fontSize: '10px',
            itemMargin: {
              horizontal: 5,
              vertical: 5
            }
          }
        }
      },
      {
        breakpoint: 620, // Puedes agregar más breakpoints si lo necesitas
        options: {
          chart: {
            width: '110%'
          },
          legend: {
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
            fontSize: '8px',
            itemMargin: {
              horizontal: 1,
              vertical: 1
            }
          }
        }
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '150%',
        }
      }
    },
    tooltip: {
      theme: 'dark'
    }
  });

  useEffect(() => {
    setSeries([activeUsers, inactiveUsers, usersInTournament, usersOutTournament]);
  }, [activeUsers, inactiveUsers, usersInTournament, usersOutTournament]);

  return (
  <>
    <div className="bg-white rounded-lg w-full flex justify-center mt-4">
      {/* <div className="overflow-hidden"> */}
        <ApexCharts options={options} series={series} type="pie" width={550}/>
      {/* </div> */}
    </div>
    </>
  );
};

export default UsersPie;