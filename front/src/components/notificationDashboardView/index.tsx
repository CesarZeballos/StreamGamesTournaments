

export const NotificationDashboardView: React.FC = () => {

    return (
        <div>
            <h1 className="heading5 text-lightViolet">Your notifications</h1>
            <div className="flex flex-row w-full items-center justify-around mt-4">
                <button className="buttonSecondary">Friend requests</button>
                <button className="buttonSecondary">Tournaments requests</button>
            </div>
        </div>
    )
}