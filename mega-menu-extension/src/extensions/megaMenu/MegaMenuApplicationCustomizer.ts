import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import MegaMenu, { IMegaMenuProps } from '../../components/megamenu';

import * as strings from 'MegaMenuApplicationCustomizerStrings';

const LOG_SOURCE: string = 'MegaMenuApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMegaMenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MegaMenuApplicationCustomizer
  extends BaseApplicationCustomizer<IMegaMenuApplicationCustomizerProperties> {
  private _placeholder: 
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this._placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (this._placeholder) {
      const helloWorld: React.ReactElement<{}> =
        React.createElement(MegaMenu, {
          spHttpClient: this.context.spHttpClient,
          siteUrl: this.context.pageContext.web.absoluteUrl
        } as IMegaMenuProps);

      ReactDOM.render(helloWorld, this._placeholder.domElement);
    }
    return Promise.resolve<void>();
  }
}
