export interface Task {
  display: boolean;
  inputDisplay: boolean;
  editBtnDisplay: boolean;
  taskID?: number;
  title: string;
  detail: string;
  date: Date;
  status: boolean;
}
