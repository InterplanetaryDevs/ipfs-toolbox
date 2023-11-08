import React from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import {Button, IconButton} from '@mui/material';
import {IShortCut} from '../services/ShortcutService/IShortCut';

export function ShortcutButton(props: { shortcut: IShortCut, iconOnly?: boolean }) {
	function onClick() {
		props.shortcut.action();
	}

	if (props.iconOnly) {
		return <IconButton onClick={onClick}>{props.shortcut.icon ?? <BoltIcon/>}</IconButton>;
	}
	return <Button onClick={onClick}>
		{props.shortcut.icon}
		{props.shortcut.name}
	</Button>;
}
