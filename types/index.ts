interface IEntity {
  _id: string;
  creationDate: Date;
  isDeleted: boolean;
}

export interface IStudent extends IEntity {
  firstName: string;
  lastName: string;
  description?: string;
  email?: string;
  phones: { name: string; value: number }[];
  courses: ICourse[];
}

export interface ICourse extends IEntity {
  name: string;
  amount: number;
}
