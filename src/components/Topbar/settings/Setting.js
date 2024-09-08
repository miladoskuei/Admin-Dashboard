import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Badge } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsMenu = () => {
const [anchorEl, setAnchorEl] = useState(null);
const [settings, setSettings] = useState([
{ id: 1, label: 'Profile' },
{ id: 2, label: 'Account' },
{ id: 3, label: 'Logout' },
]);

const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};

return (
<div>
<IconButton
aria-label="settings"
aria-controls="settings-menu"
aria-haspopup="true"
onClick={handleClick}
>
<Badge
badgeContent={settings.length}
sx={{
'& .MuiBadge-badge': {
backgroundColor: 'red',
color: 'white',
},
}}
>
<SettingsIcon />
</Badge>
</IconButton>
<Menu
id="settings-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
>
{settings.map((setting) => (
<MenuItem key={setting.id} onClick={handleClose}>
{setting.label}
</MenuItem>
))}
</Menu>
</div>
);
};

export default SettingsMenu;

