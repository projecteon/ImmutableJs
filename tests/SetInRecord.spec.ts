import { Record, Map, List } from 'Immutable';

import {UserRecord, User, UserModel} from '../src/scripts/model/User';
import {AddressRecord, Address, AddressModel} from '../src/scripts/model/Address';
import {SetInRecord} from '../src/scripts/util/NavigatableRecord';

describe('User', () => {
  let user: Record.Instance<UserModel> & Readonly<UserModel>;

  beforeEach(() => {
    user = User;
  });

  it('name should be the same as for default User record', () => {
    expect(user.Name).toBe('John Doe');
  });

  it('age should be the same as for default User record', () => {
    expect(user.Age).toBe(0);
  });

  it('name should be the same as for default User record', () => {
    expect(user.Address).toBe(Address);
  });

  describe('update shallow simple property  with SetIn', ()  => {
    let newUser: Record.Instance<UserModel> & Readonly<UserModel>;

    beforeEach(() => {
      newUser = SetInRecord(user, t => t.To(q => q.Name), 'Jane Doe'); // typecheks and validates property name is valid
    });

    it('should create new referance', () => {
      expect(newUser === user).toBeFalsy();
    });

    it('propety should be updated on return object', () => {
      expect(newUser.Name).toBe('Jane Doe');
    });

    it('propety should remain the same on old object', () => {
      expect(user.Name).toBe('John Doe');
    });
  });

  describe('update complex property with new with SetIn', () => {
    let newUser: Record.Instance<UserModel> & Readonly<UserModel>;

    beforeEach(() => {
      newUser = SetInRecord(user, t => t.To(q => q.Address), new AddressRecord({Country: 'Canada'})); // typecheks and validates property name is valid
    });

    it('should create new referance', () => {
      expect(newUser === user).toBeFalsy();
    });

    it('propety on complex object should be updated', () => {
      expect(newUser.Address.Country).toBe('Canada');
    });

    it('other properties on complex object should remain the same', () => {
      expect(newUser.Address.StreetName).toBe(user.Address.StreetName);
      expect(newUser.Address.ZipCode).toBe(user.Address.ZipCode);
    });

    it('propety should remain the same on old object', () => {
      expect(user.Address).toBe(Address);
    });
  });

  describe('update complex shallow property with new with SetIn', () => {
    let newUser: Record.Instance<UserModel> & Readonly<UserModel>;

    beforeEach(() => {
      newUser = SetInRecord(user, t => t.To(q => q.Address.Country), 'Canada'); // typecheks and validates property name is valid
    });

    it('should create new referance', () => {
      expect(newUser === user).toBeFalsy();
    });

    it('propety on complex object should be updated', () => {
      expect(newUser.Address.Country).toBe('Canada');
    });

    it('other properties on complex object should remain the same', () => {
      expect(newUser.Address.StreetName).toBe(user.Address.StreetName);
      expect(newUser.Address.ZipCode).toBe(user.Address.ZipCode);
    });

    it('propety should remain the same on old object', () => {
      expect(user.Address).toBe(Address);
    });
  });

});
