import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

// function refreshMessages(): MessageExample[] {
//   const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

//   return Array.from(new Array(50)).map(
//     () => messageExamples[getRandomInt(messageExamples.length)],
//   );
// }

interface FixedBottomNavigationProps {
    expand: boolean;
  }
  

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
//   const [messages, setMessages] = React.useState(() => refreshMessages());

//   React.useEffect(() => {
//     (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
//     setMessages(refreshMessages());
//   }, [value, setMessages]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {/* <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List> */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="ちいかわ" 
                icon={<img src="/icon512_maskable.png" alt="ちいかわ" style={{ width: 24, height: 24 }} />}
/>
          <BottomNavigationAction label="はちわれ" 
            icon={<img src="/hatiware.jpeg" alt="はちわれ" style={{ width: 24, height: 24 }} />}
/>
          <BottomNavigationAction label="栗まんじゅう" 
                      icon={<img src="/kurimanjuu.jpg" alt="栗まんじゅう" style={{ width: 24, height: 24 }} />}
                      />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
