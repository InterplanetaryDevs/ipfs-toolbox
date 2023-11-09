/**
 * Action executed for value changes
 */
export type IChangeAction = (value: any) => void
/**
 * Action executed for changing the name
 */
export type IRenameAction = (name: string) => void
/**
 * Action executed for deleting a property or link
 */
export type IDeleteAction = () => void
/**
 * Action executed for adding a property or link
 */
export type IAddAction = (name: string, value: any) => void
