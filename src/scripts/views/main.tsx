import * as React from 'react';

export interface IMainProps extends React.Props<any> {
}

export interface IMainState extends React.Props<any> {
}

export class Main extends React.Component<IMainProps, IMainState> {

  constructor(props: IMainProps) {
    super(props);
  }

  render() {
    return  <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
            </div>;
  }
}
