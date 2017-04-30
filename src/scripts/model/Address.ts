import { Record, Map, List } from 'Immutable';
import { Constructor } from '../util/ImmutableJSExtensions';

export type AddressModel = { StreetName: string; ZipCode: number; City: string, Country: string; };
const defaultState: AddressModel = {
  StreetName: '123 Main St',
  ZipCode: 1000,
  City: 'Anytown',
  Country: 'USA',
};

type PartialAddressModel = Partial<AddressModel>;

const RecordClass = Record<AddressModel>(defaultState, 'AddressRecord');
export const Address = new RecordClass();
export const AddressRecord = RecordClass as any as Constructor<AddressModel>;

