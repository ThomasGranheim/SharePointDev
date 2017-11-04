import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WikiSearchWebPartStrings';
import WikiSearch from './components/WikiSearch';
import { IWikiSearchProps } from './components/IWikiSearchProps';

export interface IWikiSearchWebPartProps {
  description: string;
}

export default class WikiSearchWebPart extends BaseClientSideWebPart<IWikiSearchWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWikiSearchProps > = React.createElement(
      WikiSearch,
      {
        description: this.properties.description
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
