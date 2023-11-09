import {Chip} from '@mui/material';
import React, {PropsWithoutRef} from 'react';
import {IKeyBind} from '../services/ShortcutService/IKeyBind';

export function ShortCutDisplay({keyBind}: PropsWithoutRef<{ keyBind: IKeyBind }>) {
	return <div>
		{keyBind.ctrl && <><Chip label={'CTRL'}/> + </>}
		{keyBind.alt && <><Chip label={'ALT'}/> + </>}
		{keyBind.shift && <><Chip label={'SHIFT'}/> + </>}
		<Chip label={keyBind.key.replace(' ', 'space').toUpperCase()}/>
	</div>;
}
