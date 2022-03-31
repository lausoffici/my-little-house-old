interface IEntity {
  _id: string;
  creationDate: Date;
  active: boolean;
}

export interface IStudent extends IEntity {
  firstName: string;
  lastName: string;
  courses: string[];
  description?: string;
  phones?: { name: string; value: number }[];
  address?: string;
  email?: string;
}

export interface ICourse extends IEntity {
  name: string;
  amount: number;
}
