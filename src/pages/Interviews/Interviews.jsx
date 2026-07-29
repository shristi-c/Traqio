import { Link } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Common/Button";

import InterviewList from "../../components/Interview/InterviewList";

function Interviews() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interviews"
        subtitle="Manage your scheduled interviews."
        action={
          <Link to="/dashboard/interviews/new">
            <Button>
              + Schedule Interview
            </Button>
          </Link>
        }
      />

      <InterviewList />
    </div>
  );
}

export default Interviews;