import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import commandRegistry from "../CommandRegistry";
import { useDispatch, useSelector } from "react-redux";
import { addMuscleFilter, setMuscleFilter } from "./app/searchMuscleTextSlice";
import { selectMuscleText } from "./app/searchMuscleTextSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedCommand, theme) {
  return {
    fontWeight:
      selectedCommand.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CommandSelector() {
  const theme = useTheme();
  const [commands, setCommands] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState("");
  const [command, setCommand] = useState();

  useState(() => {
    setCommands(Array.from(commandRegistry.getCommands()));
  }, []);

  const handleChange = (event) => {
    setSelectedCommand(event.target.value);
  };
  const handleInputChange = (event) => {
    setCommand(event.target.value);
  };
  const handleButtonClick = (event) => {
    let commandSplit = command.split("-");
    const instruction = commandSplit[0];
    const params = commandSplit.slice(1, Array.from(commandSplit).length);
    switch (instruction) {
      case "/view":
        commandRegistry.execute(`view:${params[0]}`, {
          muscleSelected: [],
          secondaryMuscles: params.slice(1, params.length),
        });
        break;
      case "/update":
        let exercise = params[0];
        let instructionValue = params[1];
        commandRegistry.execute(`updateinstruction`, {
          exercise: exercise,
          value: instructionValue,
        });
        break;
      case "/updateshoulders":
        commandRegistry.execute(instruction);
        break;
    }
    // commandRegistry.execute(selectedCommand, {});
  };

  return (
    <div>
      <FormControl sx={{ m: 1, display: "flex" }}>
        <TextField
          id="outlined-basic"
          label="Command"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleButtonClick}>
          Execute Command
        </Button>
      </FormControl>
    </div>
  );
}
