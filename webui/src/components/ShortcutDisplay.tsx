import {Chip} from '@mui/material';
import React, {PropsWithoutRef} from 'react';
import {IKeyBind} from '../services/ShortcutService';

export function ShortcutDisplay({keyBind}: PropsWithoutRef<{ keyBind: IKeyBind }>) {
	return <div>
		{keyBind.ctrl && <><Chip label={'CTRL'}/> + </>}
		{keyBind.alt && <><Chip label={'ALT'}/> + </>}
		{keyBind.shift && <><Chip label={'SHIFT'}/> + </>}
		<Chip label={keyBind.key.replace(' ', 'space').toUpperCase()}/>
	</div>;
}
