import UsersArea from "@/components/Areas/UsersArea";
import TournamentsArea from "@/components/Areas/TournamentsArea";

const AdminPage: React.FC = () => {
  return (
    <div className="bodyContainer mb-small">
      <div>
        <UsersArea />
      </div>
      <div>
        <TournamentsArea />
      </div>
    </div>
  );
};

export default AdminPage;
