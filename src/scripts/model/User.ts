import { Record, Map, List } from 'Immutable';
import { Constructor } from '../util/ImmutableJSExtensions';
import { AddressModel, Address } from './Address';

export type UserModel = {Name: string, Age: number, Address: AddressModel};
const defaultState: UserModel = {
  Name: 'John Doe',
  Age: 0,
  Address: Address,
};

type PartialUserModel = Partial<UserModel>;

const RecordClass = Record<UserModel>(defaultState, 'UserRecord');
export const User = new RecordClass();
export const UserRecord = RecordClass as any as Constructor<PartialUserModel>;

