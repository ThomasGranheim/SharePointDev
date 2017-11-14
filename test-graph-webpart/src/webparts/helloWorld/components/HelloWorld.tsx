import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraph } from './MSGraph';
import {
  WebPartContext,

} from '@microsoft/sp-webpart-base';

export interface IHelloWorldProps {
  description: string;
  context: WebPartContext;
}

export interface IHelloWorldState {
  items: Array<any>;
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  constructor(props: IHelloWorldProps, state: IHelloWorldState) {
    super(props);
    this.state = {
      items: []
    };
  }
  public componentDidMount() {
    this.fetchData();
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    let { items } = this.state;
    let elements = items.map((item) => {
      return <div> {item.name} </div>;
    });
    return (
      <div className={styles.helloWorld}>
        {elements}
      </div>
    );
  }
  private fetchData(): void {
    MSGraph.Get(this.props.context.graphHttpClient, "v1.0/sites?search=*&$orderBy=lastModifiedDateTime desc").then((response) => {
      this.setState({ items: response.value });
    });
  }
} 
