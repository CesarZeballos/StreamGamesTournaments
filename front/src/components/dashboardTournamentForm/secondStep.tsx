import { ISecondStep } from "@/interfaces/interfaceRedux";
import { IAwardsInForm, ISecondStepError } from "@/interfaces/interfaceTournaments";
import { setSecondStep } from "@/redux/slices/organizerSlice";
import { AppDispatch } from "@/redux/store";
import { validateTournamentSecondStep } from "@/utils/validateForms/validationTournamentPost";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


export const SecondStep: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<ISecondStep>({} as ISecondStep);
    const [errorTournament, setErrorTournament] = useState<ISecondStepError>({} as ISecondStepError);
    const [awards, setAwards] = useState<IAwardsInForm>({} as IAwardsInForm);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
        const error = validateTournamentSecondStep({ ...data, [name]: value });
        setErrorTournament(error);
    };

    const handleChangeAwards = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAwards({
            ...awards,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ((awards.second && (!awards.first || awards.first.trim() === "")) ||
        (awards.third && (!awards.first || awards.first.trim() === "" || !awards.second || awards.second.trim() === ""))) {
            toast.error("Please complete the previous prizes before adding the current one.", {
                position: 'top-right',
                duration: 2000,
            });
            return;
        } else if (awards.first === "" || awards.first === undefined) {
            toast.info("Your tournament has no awards", {
                position: 'top-right',
                duration: 1500,
                action: {
                    label: "ok",
                    onClick: () => {
                        setData({
                            ...data,
                            awards: []
                        });
                        dispatch(setSecondStep(data));
                    },
                }
            });
        } else {
            const awardArray = [];
            awardArray.push(awards.first);
            awardArray.push(awards.second);
            awardArray.push(awards.third);
            dispatch(setSecondStep({
                ...data,
                awards: awardArray
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="col-span-2">
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Number of members</label>
                    <input
                        type="number"
                        name="membersNumber"
                        value={data.membersNumber}
                        onChange={handleChange}
                        className="inputFit"
                        min={1}
                        max={99}
                        maxLength={2}
                        required
                    />
                    {errorTournament.membersNumber ? (
                        <p className="errorForm">{errorTournament.membersNumber}</p>
                    ) : (<p className="errorForm"><br /></p>)}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Maximum teams</label>
                    <input
                        type="number"
                        name="maxTeams"
                        value={data.maxTeams}
                        onChange={handleChange}
                        required
                        className="inputFit"
                        min={2}
                        max={99}
                        maxLength={2}
                    />
                    {errorTournament.maxTeam ? (
                        <p className="errorForm">{errorTournament.maxTeam}</p>
                    ) : (<p className="errorForm"><br /></p>)}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Price</label>
                    <input
                        type="string"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        className="inputFit"
                        min={0}
                    />
                    {errorTournament.price ? (
                        <p className="errorForm">{errorTournament.price}</p>
                    ) : (<p className="errorForm"><br /></p>)}
                </div>
            </div>

            <div className="flex flex-col gap-2 w-fit">
                <label className="body text-white">Awards</label>
                <p className="errorForm">Awards are not a requirement but are valued by participants</p>
                <div className="grid grid-cols-3">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="body text-white">First position</label>
                        <input
                            type="text"
                            name="first"
                            value={awards.first}
                            onChange={handleChangeAwards}
                            className="input"
                        />
                        <label className="body text-white">Second position</label>
                        <input
                            type="text"
                            name="second"
                            value={awards.second}
                            onChange={handleChangeAwards}
                            className="input"
                            disabled={!awards.first || awards.first.trim() === ""}
                        />
                        <label className="body text-white">Third position</label>
                        <input
                            type="text"
                            name="third"
                            value={awards.third}
                            onChange={handleChangeAwards}
                            className="input"
                            disabled={!awards.second || awards.second.trim() === ""}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-fit">
                <label className="body text-white">Description</label>
                <textarea
                    value={data.description}
                    name="description"
                    onChange={handleChange}
                    required
                    className="inputMax"
                    placeholder="Enter a description of the tournament"
                    maxLength={500}
                />
                {errorTournament.description ? (
                    <p className="errorForm">{errorTournament.description}</p>
                ) : (<p className="errorForm"><br /></p>)}
            </div>

            <div className="flex flex-col gap-2 w-fit">
                <button type="submit" className="buttonPrimary">Next</button>
            </div>
        </form>
    );
}

