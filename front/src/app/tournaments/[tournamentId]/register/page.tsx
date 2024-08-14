'use client'
import { TournamentRegisterForm } from "@/components/tournamentRegisterForm";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const TournamentRegister = ({ params }: { params: { tournamentId: string } }) => {
    const tourId = params.tournamentId

    return (
        <div className="bodyContainer mb-16">
            <TournamentRegisterForm tourId={tourId!} />
        </div>
    );
}

export default TournamentRegister;