import EngineeringIcon from '@mui/icons-material/Engineering';

export const DashboardViewNotification: React.FC = () => {

    return (
        <div>
            <h1 className="heading5 text-lightViolet">Your notifications</h1>
            <div className="flex flex-row w-full items-center justify-around mt-4">
                <button className="buttonSecondary">Friend requests</button>
                <button className="buttonSecondary">Tournaments requests</button>
            </div>

            <h1 className="heading5 text-lightViolet mt-8 flex gap-4"><EngineeringIcon />Work in process</h1>
        </div>
    )
}