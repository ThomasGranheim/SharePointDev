import { override } from '@microsoft/decorators';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  Placeholder
} from '@microsoft/sp-application-base';

import * as strings from 'megaMenuSampleStrings';

import MegaMenu, { IMegaMenuProps } from './components/MegaMenu';

const LOG_SOURCE: string = 'MegaMenuSampleApplicationCustomizer';



/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMegaMenuSampleApplicationCustomizerProperties {
  Header: string;
  Footer: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MegaMenuSampleApplicationCustomizer
  extends BaseApplicationCustomizer<IMegaMenuSampleApplicationCustomizerProperties> {

  private _headerPlaceholder: Placeholder;
  private _footerPlaceholder: Placeholder;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    return Promise.resolve<void>();
  }

  @override
  public onRender(): void {
    console.log(this.context.placeholders.placeholderNames);
    // Handling the header placeholder
    if (!this._headerPlaceholder) {
      this._headerPlaceholder = this.context.placeholders.tryAttach(
        'Top',
        {
          onDispose: this._onDispose
        });

      // The extension should not assume that the expected placeholder is available.
      if (!this._headerPlaceholder) {
        console.error('The expected placeholder (PageHeader) was not found.');
        return;
      }

      if (this.properties) {
        console.log("Attach complete.")
        let headerString: string = this.properties.Header;
        if (!headerString) {
          headerString = '(Header property was not defined.)';
        }

        if (this._headerPlaceholder.domElement) {
          const megamenu: React.ReactElement<{}> =
            React.createElement(MegaMenu, {
              spHttpClient: this.context.spHttpClient,
              siteUrl: this.context.pageContext.web.absoluteUrl
            } as IMegaMenuProps);

          ReactDOM.render(megamenu, this._headerPlaceholder.domElement);
        }
      }
    }
  }
  private _onDispose(): void {
    console.log('[CustomHeader._onDispose] Disposed custom header.');
  }
}
