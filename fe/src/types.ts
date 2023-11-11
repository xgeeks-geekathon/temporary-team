export interface ISubtask {
  id: number;
  title: string;
  description: string;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  subTasks: ISubtask[] | undefined;
}

export type IBoilerplate = string;
