import {Box, Button, Popover} from '@mui/material';
import React, {PropsWithChildren, useState} from 'react';

interface IOptionsButtonProps extends PropsWithChildren {

}

export function OptionsButton({children}: IOptionsButtonProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return <>
		<Button onClick={handleClick}>Options</Button>
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			<Box sx={{padding: 1}}>
			{children}
			</Box>
		</Popover>
	</>;
}