import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TextField from '@mui/material/TextField';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

import MuscleSelector from './MuscleSelector';
import { useSelector, useDispatch } from 'react-redux';
import { setWorkoutText } from './app/searchWorkoutTextSlice';
import { addMuscleFilter, removeMuscleFilter, selectMuscleText } from './app/searchMuscleTextSlice';

const drawerWidth = 240;

const workouts = ['Shoulders', 'Chest', 'Biceps', 'Forearms', 'Abs', 
                    'Obliques', 'Quads', 'Adductors', 'Traps', 'Tricpes',
                    'Lats', 'Lower back', 'Abductors', 'Glutes', 'Hamstrings', 
                    'Calves']

export default function Layout({children}) {

    const muscleText = useSelector(selectMuscleText)
    const dispatch = useDispatch()
    const [menuItems, setMenuItems] = useState(workouts)

    const handleTextInput = (event) => {
        dispatch(setWorkoutText(event.target.value))
    }
    const handleMuscleClick = (muscle) => {
        muscle = muscle.toLowerCase()
        if (muscleText.includes(muscle)) {
            // Remove
            dispatch(removeMuscleFilter(muscle))
        } else {
            // Add
            dispatch(addMuscleFilter(String(muscle).toLowerCase()))
        }
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Workout 💪🏼
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <TextField id="workout-list" label="Search Workouts" variant="standard" 
                onChange={handleTextInput}
            />
            <MuscleSelector />
          <List>
            {menuItems.map((text, index) => (
                <ListItem key={text} disablePadding onClick={() => handleMuscleClick(text)}
                    sx={muscleText.includes(text.toLowerCase()) ? {backgroundColor: '#99cfff'} : {}}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <AccessibilityIcon /> : <FitnessCenterIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}