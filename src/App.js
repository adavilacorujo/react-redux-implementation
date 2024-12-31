import "./App.css";
import Layout from "./components/Layout";
import { prompt } from "./components/utils/prompt";
import DataTable from "./components/Table";
import { useEffect } from "react";
import { loadData } from "./components/app/rowsSlice";
import { useDispatch } from "react-redux";

const addData = (dispatch) => {
  const data = require("./components/utils/data.json");
  let counter = 0;
  const rows = [];
  for (const muscle in data) {
    for (const workout in data[muscle]) {
      let tempRow = {
        id: ++counter,
        muscle: muscle,
        exercise: workout,
        instructions: data[muscle][workout]["instructions"],
      };
      rows.push(tempRow);
    }
  }
  dispatch(loadData(rows));
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get data
    addData(dispatch);
  }, []);

  return (
    <div className="App">
      <Layout>
        {prompt()}
        <DataTable />
      </Layout>
    </div>
  );
}

export default App;
