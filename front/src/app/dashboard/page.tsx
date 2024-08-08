import { RouterDashboard } from "@/components/routerDashboard"
import { DashboardSelector } from "@/components/userDashboardView"

const Dashboard: React.FC = () => {
    return (
        <div className="bodyContainer">
            <RouterDashboard>
                <DashboardSelector/>
            </RouterDashboard>
        </div>
    )
}

export default Dashboard