import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

export default function SideBar({state, setState}) {
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {SidebarData.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Link style={{ textDecoration: 'none', width: '100%' }} to={item.path}>
                            <ListItemButton >
                                <ListItemText><div style={{'display': 'flex', 'flexDirection': 'row' , 'alignItems': 'center'}}>{item.icon}{item.title}</div></ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                {/* <Button onClick={toggleDrawer('left', true)}>{'left'}</Button> */}
                <Drawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}