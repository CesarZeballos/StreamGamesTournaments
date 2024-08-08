
import { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ITournament } from '@/interfaces/interfaceTournaments';
export const DashboardViewTournamentsNotification: React.FC = () => {
    const 

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
                    <th className="text-center">Nickname</th>
                    <th className="text-center">Chat</th>
                    <th className="text-center">Delete</th>
                </thead>
                <tbody className="tableBody flex flex-col gap-2">
                    {newTournaments.map((tour: ITournament) => (
                        <tr key={tour.id} className="flex flex-row justify-around">
                            <td>{tour.nameTournament}</td>
                            <td className="text-center">
                                <button className="iconButton" value={tour.id} onClick={check}>
                                    <TaskAltIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>)
            }
            </table>
        </div>
    </div>
    )
}