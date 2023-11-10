import React, { useContext, useState } from 'react';

interface IState {
  repoURL: string | undefined;
  userStories: any | undefined;
}

interface IMyContext {
  state: IState;
  handleChange: (value: Partial<IState>) => void;
}

const MyContext = React.createContext<IMyContext>({
  handleChange: () => {},
  state: { repoURL: undefined, userStories: undefined },
});

function Context({ children }: { children: any }) {
  const [state, setState] = useState<IState>({
    repoURL: undefined,
    userStories: undefined,
  });

  const handleChange = (value: Partial<IState>) => {
    setState({ ...state, ...value });
  };

  console.log(state);

  return <MyContext.Provider value={{ state, handleChange }}>{children}</MyContext.Provider>;
}

export default Context;

export const useMyContext = () => useContext(MyContext);
