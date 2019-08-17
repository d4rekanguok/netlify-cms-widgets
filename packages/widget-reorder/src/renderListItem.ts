import { List } from 'immutable'
import { extract } from './utils'

interface RenderListItemArgs {
  item: Record<any, any>;
  fieldDisplay: List<string>;
  isRemoved: boolean;
}
type RenderListResult = string | React.ComponentType<RenderListItemArgs>;
export type RenderListItem = (args: RenderListItemArgs) => RenderListResult

export const defaultListItem: RenderListItem = ({ item, fieldDisplay, isRemoved }) => {
  if (isRemoved) {
    return `This item has been removed (id: ${item})`
  }
  const displayData = extract(item, ...fieldDisplay)
  return Object.values(displayData).join(' ')
}