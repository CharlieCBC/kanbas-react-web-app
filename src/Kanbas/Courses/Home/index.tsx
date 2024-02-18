import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div className="d-flex">
      <div style={{ minWidth: "500px", flex: "1" }}>
        <ModuleList />
      </div>
      <div className="mt-3 mx-3">
        <div style={{ width: "250px" }}>
          <Status />
        </div>
      </div>
    </div>
  );
}

export default Home;
