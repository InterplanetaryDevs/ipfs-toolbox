import {Tab, Tabs} from '@mui/material';
import React, {ReactNode, useState} from 'react';
import {useMenu} from './UseMenu';

export function useTabs(tabs: [Tab, ReactNode][]) {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		{tabs.map(t => t[0])}
	</Tabs>);

	return {
		content: tabs[tab][1],
		setTab: (newTab: number): void => {
			setTab(Math.min(Math.max(newTab, 0), tabs.length - 1));
		},
	};
}
