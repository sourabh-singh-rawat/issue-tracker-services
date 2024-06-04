interface TaskGroupFormDataInputs {
  name: string;
  dueDate?: Date;
  completed?: boolean;
}

export class TaskGroupFormData {
  name;
  dueDate?;
  completed?;

  constructor({ name, dueDate, completed }: TaskGroupFormDataInputs) {
    this.name = name;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}
