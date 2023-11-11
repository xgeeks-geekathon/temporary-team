import React, { useCallback, useContext, useState } from 'react';

interface IIssue {}

interface IState {
  repoURL: string | undefined;
  issues: IIssue[] | undefined;
  activeIssue: number | undefined;
}

interface IMyContext {
  state: IState;
  handleChange: (value: Partial<IState>) => void;
}

const MyContext = React.createContext<IMyContext>({
  handleChange: () => {},
  state: { repoURL: undefined, issues: undefined, activeIssue: undefined },
});

function Context({ children }: { children: any }) {
  const [, setUpdater] = useState(0);

  const getData = () => {
    const stringData = localStorage.getItem('my-data');

    if (!stringData) return {};

    return JSON.parse(stringData);
  };

  const handleChange = useCallback((value: Partial<IState>) => {
    localStorage.setItem('my-data', JSON.stringify({ ...getData(), ...value }));
    setUpdater((current) => current + 1);
  }, []);

  return <MyContext.Provider value={{ state: getData(), handleChange }}>{children}</MyContext.Provider>;
}

export default Context;

export const useMyContext = () => useContext(MyContext);
