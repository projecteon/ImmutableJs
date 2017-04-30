import {Record} from 'Immutable';

export class NavigatableRecord<T>{
  constructor(private obj: T, private path: string[] = []) { }

  To<R>(p: (x: T) => R): NavigatableRecord<R> {
    let propName = this.getPropName(p);
    if (propName) {
      return new NavigatableRecord<R>(
        p(this.obj),
        this.path.concat(propName),
      );
    } else {
      return new NavigatableRecord<R>(
        p(this.obj),
        this.path,
      );
    }
  }
  getPath() {
    return this.path;
  }

  private static propertyRegEx = /\.([^\.;]+)/g;

  private getPropName(propertyFunction: Function) {
    let matches, output = [];
    while (matches = NavigatableRecord.propertyRegEx.exec(propertyFunction.toString())) {
        output.push(matches[1]);
    }

    return output;
  }
}

export function SetInRecord<T, Q>(instance: Record.Instance<T> & Readonly<T>, fn: (x: NavigatableRecord<T>) => NavigatableRecord<Q>, value: Q) {
  let propPath = fn(new NavigatableRecord<T>(instance)).getPath();
  return instance.setIn(propPath, value);
}
