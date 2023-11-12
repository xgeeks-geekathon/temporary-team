export interface ISubtask {
  id: number;
  title: string;
  body: string;
  prLink: string | undefined;
}

export interface IIssue {
  id: number;
  title: string;
  body: string;
  subtasks: ISubtask[] | undefined;
}

export type IBoilerplate = string;
