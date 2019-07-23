import { ReactNode } from 'react'
import { Map } from 'immutable'

export interface WidgetProps {
  forID?: string;
  field: Map<any, any>;
  hasActiveStyle?: boolean;
  setActiveStyle: () => void;
  setInactiveStyle: () => void;
  classNameWrapper: string;
  classNameWidget: string;
  classNameWidgetActive: string;
  classNameLabel: string;
  classNameLabelActive: string;
  value?: any;
  ref: Function;
  mediaPaths: Map<any, any>;
  metadata?: Map<any, any>;
  fieldsErrors?: Map<any, any>;
  onChange: Function;
  onChangeObject: Function;
  onValidate?: Function;
  onValidateObject?: Function;
  onOpenMediaLibrary: Function;
  onClearMediaControl: Function;
  onRemoveMediaControl: Function;
  onAddAsset: Function;
  onRemoveInsertedMedia: Function;
  getAsset: Function;
  resolveWidget: Function;
  getEditorComponents: Function;
  isFetching?: boolean;
  controlRef?: Function;
  query: Function;
  clearSearch: Function;
  clearFieldErrors: Function;
  queryHits?: any[] | Record<string, any>;
  editorControl: Function;
  uniqueFieldId: string;
  loadEntry: Function;
  t: Function;
}
