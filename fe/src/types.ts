export interface ISubtask {
  id: number;
  title: string;
  description: string;
  prLink: string | undefined;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  subtasks: ISubtask[] | undefined;
}

export type IBoilerplate = string;
