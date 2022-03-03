interface IEntity {
  _id: string;
  creationDate: Date;
  isDeleted: boolean;
}

export interface IStudent extends IEntity {
  firstName: string;
  lastName: string;
  courses: ICourse[];
  description?: string;
  phones?: { name: string; value: number }[];
  address?: string;
  email?: string;
}

export interface ICourse extends IEntity {
  name: string;
  amount: number;
}
