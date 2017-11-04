import * as React from 'react';
import styles from './WikiSearch.module.scss';
import { IWikiSearchProps } from './IWikiSearchProps';
import { IWikiSearchState } from './IWikiSearchState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IWiki } from '../IWiki';
import { IGroup } from '../IGroup';
import MockHttpClient from '../MockHttpClient';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class WikiSearch extends React.Component<IWikiSearchProps, IWikiSearchState> {

  constructor(props: IWikiSearchProps, state: IWikiSearchState) {
    super(props);
    this.state = {
      pages: Array<IWiki>(),
    };
  }
  public render(): React.ReactElement<IWikiSearchProps> {
    let { searchLabel } = this.props;
    let { pages } = this.state;

    let group = pages.reduce((prev, current) => {
      console.log(prev);
      prev[current.Topic] = prev[current.Topic] || new Array();
      prev[current.Topic].push(current)
      return prev;
    }, [])
    console.log(group);
    let pagesElement = pages.map((item, index) => {
      return (<div key={index}>{item.Title}</div>)
    });
    return (
      <div className={styles.wikiSearch}>
        <div className={styles.container}>
          <div className={styles.row}>
            <SearchBox
              labelText={searchLabel}
              onChange={(value: string) => this.onSearch(value)}
            />
            {pagesElement}
          </div>
        </div>
      </div>
    );
  }

  private onSearch(value: string): void {
    this._getMockListData().then((pages: IWiki[]) => {
      let filteredPages = pages.filter(_ => _.Title.toLowerCase().indexOf(value.toLowerCase()) >= 0);
      this.setState({
        pages: filteredPages,
      });
    });
  }

  private _getMockListData(): Promise<IWiki[]> {
    return MockHttpClient.get()
      .then((data: IWiki[]) => {
        return data;
      });
  }
}
