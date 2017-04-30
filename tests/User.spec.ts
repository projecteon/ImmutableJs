import { Record, Map, List } from 'Immutable';
import {UserRecord, User, UserModel} from '../src/scripts/model/User';

describe('User', () => {
  let user: Record.Instance<UserModel> & Readonly<UserModel>;

  beforeEach(() => {
    user = User;
  });

  it('default name should be John Doe', () => {
    expect(user.Name).toBe('John Doe');
  });

  it('update name should create new referance', () => {
    let newUser = user.set('Name', 'Jane Doe'); // must first change to something different to trigger change (same would just return old object)
    newUser = newUser.set('Name', 'John Doe'); // change name back to original to make sure we are checking object ref are different and not just values
    expect(user.Name).toBe('John Doe');
    expect(newUser.Name).toBe('John Doe');
    expect(newUser === user).toBeFalsy();
  });

  it('update address should be typesafe', () => {
    let newUser = user.set('Address', {StreetName: 'New Street', ZipCode: 461, City: 'Anytown', Country: 'USA'}); // typecheks and validates property name is valid
    expect(user.Name).toBe('John Doe');
    expect(newUser === user).toBeFalsy();
  });
});
