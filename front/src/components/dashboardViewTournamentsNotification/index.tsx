
import { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ITournamentsRegistered } from '@/interfaces/interfaceUser';
import { isoToDate } from '@/utils/formatDate';
export const DashboardViewTournamentsNotification: React.FC = () => {
    const tournaments = useSelector((state: RootState) => state.user.user?.notifications);

    const newTournaments = tournaments?.filter((tour: ITournamentsRegistered) => tour.state === true)

    const check = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget
        console.log(value)
    }
    

    return (
        <div className="grid grid-cols-3">
        <div className="col-span-2">
            <h1 className="heading5 text-lightViolet">Your friends</h1>
            <table className="mt-1 w-full">
                <thead className="tableHeader flex flex-row justify-around">
                    <th className="text-center">Tournament</th>
                    <th className="text-center">Team</th>
                    <th className="text-center">Date</th>
                    <th className="text-center"></th>
                </thead>
                <tbody className="tableBody flex flex-col gap-2">
                    {newTournaments?.map((tour: ITournamentsRegistered) => (
                        <tr key={tour.id} className="flex flex-row justify-around">
                            <td className='text-center'>{tour.nameTournament}</td>
                            <td className='text-center'>{tour.nameTeam}</td>
                            <td className='text-center'>{isoToDate(tour.tournamentDate)}</td>
                            <td className="text-center">
                                <button className="iconButton" value={tour.id} onClick={check}>
                                    <TaskAltIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}