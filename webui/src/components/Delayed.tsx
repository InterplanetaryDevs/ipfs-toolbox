import React, {FC, useEffect, useState} from 'react';

export interface IDelayedProps {
  promise: Promise<JSX.Element>;
  placeholder?: JSX.Element;
}

export const Delayed: FC<IDelayedProps> = (props) => {
  const [result, setResult] = useState<JSX.Element>();
  const [error, setError] = useState<Error | string>();

  useEffect(() => {
    props.promise.then(setResult).catch(setError);
  }, [props.promise]);

  if (error) {
    return <>{error.toString()}</>;
  }

  if (!result) {
    return props.placeholder ?? <div>Loading...</div>;
  }

  return result;
};