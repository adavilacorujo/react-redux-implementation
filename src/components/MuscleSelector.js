import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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

const muscles = [
  "Shoulders",
  "Chest",
  "Biceps",
  "Forearms",
  "Abs",
  "Obliques",
  "Quads",
  "Adductors",
  "Traps",
  "Tricpes",
  "Lats",
  "Lower back",
  "Abductors",
  "Glutes",
  "Hamstrings",
  "Calves",
];

function getStyles(name, muscleName, theme) {
  return {
    fontWeight:
      muscleName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MuscleSelector({ setRenderCommands }) {
  const theme = useTheme();
  const [muscleName, setMuscleName] = useState([]);
  const muscleSelected = useSelector(selectMuscleText);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const muscles = event.target.value.map((muscle) => muscle.toLowerCase());
    dispatch(setMuscleFilter(muscles));
    // commandRegistry.execute(`click:${event.target}`, "test");

    setMuscleName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // register selectors
  useEffect(() => {
    muscles.forEach((muscle) => {
      // REGISTER COMMAND
      commandRegistry.register(
        `view:${muscle.toLocaleLowerCase()}`,
        (params) => {
          dispatch(
            setMuscleFilter([
              ...params?.muscleSelected,
              muscle.toLocaleLowerCase(),
              ...params?.secondaryMuscles,
            ])
          );
        }
      );
      commandRegistry.register(
        `unview:${muscle.toLocaleLowerCase()}`,
        (params) => {
          setMuscleName([
            ...muscleSelected.filter(
              (selectedMuscle) => selectedMuscle !== muscle
            ),
          ]);
        }
      );
    });

    // select muscles via command
    // setTimeout(() => {
    //   commandRegistry.execute("view:shoulders", {
    //     muscleSelected: muscleSelected,
    //     secondaryMuscles: ["biceps", "quads"],
    //   });
    // }, 5000);
    setRenderCommands(true);
  }, []);

  useEffect(() => {
    const muscleGroups = muscleSelected.map((muscle) => {
      const upperCase = muscle.charAt(0).toUpperCase() + muscle.slice(1);
      return upperCase;
      // return muscle.chartAt(0).toUpperCase() + muscle.slice(1)
    });
    setMuscleName(muscleGroups);
    // console.log("muscleSelected change", muscleGroups);
  }, [muscleSelected]);

  return (
    <div>
      <FormControl sx={{ m: 1, display: "flex" }}>
        <InputLabel>Muscle Group Select</InputLabel>
        <Select
          multiple
          value={muscleName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Muscle" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {muscles.map((name) => {
            const content = (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, muscleName, theme)}
              >
                {name}
              </MenuItem>
            );
            return content;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
