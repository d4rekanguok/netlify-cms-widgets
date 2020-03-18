import { WAIT_UNTIL_ACTION, WaitActionArgs } from '../redux/middleware/waitUntilAction';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { State } from '../types/redux';

export const waitUntil = ({ predicate, run }: WaitActionArgs) => {
  return {
    type: WAIT_UNTIL_ACTION,
    predicate,
    run,
  };
};

export const waitUntilWithTimeout = async <T>(
  dispatch: ThunkDispatch<State, {}, AnyAction>,
  waitActionArgs: (resolve: (value?: T) => void) => WaitActionArgs,
  timeout = 30000,
): Promise<T | null> => {
  let waitDone = false;

  const waitPromise = new Promise<T>(resolve => {
    dispatch(waitUntil(waitActionArgs(resolve)));
  });

  const timeoutPromise = new Promise<T | null>(resolve => {
    setTimeout(() => {
      if (waitDone) {
        resolve();
      } else {
        console.warn('Wait Action timed out');
        resolve(null);
      }
    }, timeout);
  });

  const result = await Promise.race([
    waitPromise
      .then(result => {
        waitDone = true;
        return result;
      })
      .catch(null),
    timeoutPromise,
  ]);

  return result;
};
