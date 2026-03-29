export interface User {
  _id?: string;
  __v?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Bank {
  _id?: string;
  __v?: number;
  firstName: string;
  lastName: string;
  office: string;
}

export interface Report {
  _id?: string;
  __v?: number;
  amount: number;
  method: string;
  donor: string | User;
  bank: string | Bank;
  lat: string;
  lng: string;
}

export interface UserStore {
  find(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  add(user: Partial<User>): Promise<User | null>;
  findBy(email: string): Promise<User | null>;
  deleteOne(id: string): Promise<void>;
  delete(): Promise<void>;
  updatePassword(id: string, password: string): Promise<void>;
}

export interface BankStore {
  find(): Promise<Bank[]>;
  findOne(id: string): Promise<Bank | null>;
  findBy(lastName: string, firstName: string): Promise<Bank | null>;
}

export interface ReportStore {
  find(): Promise<Report[]>;
  findBy(id: string): Promise<Report | null>;
  add(report: Partial<Report>): Promise<Report | null>;
  delete(): Promise<void>;
}

export interface Db {
  userStore: UserStore;
  bankStore: BankStore;
  reportStore: ReportStore;
}
