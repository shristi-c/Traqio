import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import ApplicationList from "./ApplicationList";

function Applications() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Applications"
        buttonText="+ Add Application"
        onButtonClick={() =>
          navigate("/dashboard/applications/new")
        }
      />

      <p className="text-gray-500">
        Manage all your job applications here.
      </p>

      <ApplicationList />
    </div>
  );
}

export default Applications;