import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationMenu = () => {
const [anchorEl, setAnchorEl] = useState(null);
const [notifications, setNotifications] = useState([
{ id: 1, message: 'New message from John' },
{ id: 2, message: 'Your order has been shipped' },
{ id: 3, message: 'New comment on your post' },
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
aria-label="notifications"
aria-controls="notification-menu"
aria-haspopup="true"
onClick={handleClick}
>
<Badge badgeContent={notifications.length} color="secondary" sx={{
'& .MuiBadge-badge': {
backgroundColor: 'red',
color: 'white',
},
}}>
<NotificationsIcon />
</Badge>
</IconButton>
<Menu
id="notification-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
>
{notifications.map((notification) => (
<MenuItem key={notification.id} onClick={handleClose}>
{notification.message}
</MenuItem>
))}
</Menu>
</div>
);
};

export default NotificationMenu;
