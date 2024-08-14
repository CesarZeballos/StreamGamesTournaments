'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { postTeamToTournamentSlice } from "@/redux/thunks/tournamentsSliceThunk";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FormContainer } from "../formContainer";
import PayPalButton from "../paypalButton";
import { useRouter } from "next/navigation";
import { setCancelRegisterToTournament, setStepPayment } from "@/redux/slices/paymentSlice";


export const SecondStepRegisterTeam = (tourId: {tourId: string}) => {
    const tournamentId = tourId.tourId
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const teamData = useSelector((state: RootState) => state.payment.teamData);
    const user = useSelector((state: RootState) => state.user.user);

    const onSuccess = (orderId: string) => {
        try {
            dispatch(postTeamToTournamentSlice(teamData))
            
            if (user) {
            dispatch(reloadUserSlice({
                email: user.email!,
                    tokenFirebase: user.tokenFirebase
                }))
            }
        } catch {
            toast.error("something went wrong", {
                position: 'top-right',
                duration: 1500,
            })
        }
    }

    const cancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(setCancelRegisterToTournament())
        router.push("/tournaments/" + tournamentId);
    }

    const editTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(setStepPayment("team"))
    }

    return (
    <FormContainer section={"Payment method"}>
        <PayPalButton
        tournamentId={tournamentId}
        onSuccess={onSuccess} 
        />

        <div className="flex flex-row gap-2">
            <button className="buttonSecondary" onClick={cancel}>Cancel</button>
            {/* <button className="buttonPrimary" onClick={editTeam}>Edit team</button> */}
        </div>        
    </FormContainer>
    )
}