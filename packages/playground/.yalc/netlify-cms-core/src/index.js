import bootstrap from './bootstrap';
import Registry from 'Lib/registry';

export const NetlifyCmsCore = {
  ...Registry,
  init: bootstrap,
};
export default NetlifyCmsCore;
