import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import * as strings from 'WikiSearchWebPartStrings';
import WikiSearch from './components/WikiSearch';
import { IWikiSearchProps } from './components/IWikiSearchProps';

export interface IWikiSearchWebPartProps {
  searchLabel: string;
  list: string;
}

export default class WikiSearchWebPart extends BaseClientSideWebPart<IWikiSearchWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IWikiSearchProps> = React.createElement(
      WikiSearch,
      {
        searchLabel: this.properties.searchLabel,
        list: this.properties.list
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Wiki Search"
          },
          groups: [
            {
              groupName: "Search Box",
              groupFields: [
                PropertyPaneTextField('searchLabel', {
                  label: "Label",

                }),
                PropertyPaneTextField('list', {
                  label: "List",
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
