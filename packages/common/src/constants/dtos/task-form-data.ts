interface TaskFormDataInputs {
  description: string;
  dueDate?: Date;
  completed?: boolean;
}

export class TaskFormData {
  description;
  dueDate?;
  completed?;

  constructor({ description, dueDate, completed }: TaskFormDataInputs) {
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}
