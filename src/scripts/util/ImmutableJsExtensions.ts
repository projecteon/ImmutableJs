import {Record} from 'Immutable';

export type Constructor<TInput> = {
  (input: Partial<TInput>): Record.Instance<TInput> & Readonly<TInput>;
  new (input: Partial<TInput>): Record.Instance<TInput> & Readonly<TInput>;
};
