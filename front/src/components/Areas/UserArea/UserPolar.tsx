import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface UserPolarProps {
  activeUsers: number;
  inactiveUsers: number;
  usersInTournament: number;
  usersOutTournament: number;
}

const UserPolar: React.FC<UserPolarProps> = ({ activeUsers, inactiveUsers, usersInTournament, usersOutTournament }) => {
  const [state, setState] = React.useState({
    series: [activeUsers, inactiveUsers, usersInTournament, usersOutTournament],
    options: {
      chart: {
        type: 'polarArea' as const,
      },
      stroke: {
        colors: ['#B69DD6'],
      },
      fill: {
        opacity: 0.9,
      },
      legend: {
        show: true,
        floating: false,
        fontSize: '18',
        position: 'top',
        horizontalAlign: 'center',
        itemMargin: {
          horizontal: 10,
          vertical: 10,
        },
        containerMargin: {
          top: 10,
          left: 0,
        },
      },
      labels: ['Active Users', 'Inactive Users', 'Users In Tournament', 'Users Out Tournament'],
      colors: ['#3f51ff', '#EE00EE', '#7e39b7', '#301048'],
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0.8,
            strokeColor: '#c52746',
          },
        },
      },
      grid: {
        padding: {
          top: 12,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      tooltip: {
        theme: 'dark',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    } as ApexOptions,
  });

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [activeUsers, inactiveUsers, usersInTournament, usersOutTournament],
    }));
  }, [activeUsers, inactiveUsers, usersInTournament, usersOutTournament]);

  return (
    <div className="p-6 bg-violet-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Polar Area Chart</h2>
      <div id="chart" className="chart-container w-full h-full pt-6 bg-white border border-blue-500 rounded-lg overflow-hidden">
        <Chart options={state.options} series={state.series} type="polarArea" height={400} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default UserPolar;