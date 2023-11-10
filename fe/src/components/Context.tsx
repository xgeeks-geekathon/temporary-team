import React, { useContext, useState } from 'react';

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
  const [state, setState] = useState<IState>({
    repoURL: undefined,
    issues: undefined,
    activeIssue: undefined,
  });

  const handleChange = (value: Partial<IState>) => {
    setState({ ...state, ...value });
  };

  console.log(state);

  return <MyContext.Provider value={{ state, handleChange }}>{children}</MyContext.Provider>;
}

export default Context;

export const useMyContext = () => useContext(MyContext);
