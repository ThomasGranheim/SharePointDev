import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from '@microsoft/sp-application-base';

import * as strings from 'CourseExtensionApplicationCustomizerStrings';
import CourseDetails, { ICourseDetailsProps } from '../../components/coursedetails';

const LOG_SOURCE: string = 'CourseExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICourseExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CourseExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<ICourseExtensionApplicationCustomizerProperties> {
  private _placeholder: PlaceholderContent;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this._placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (this._placeholder) {
      const courseDtails: React.ReactElement<{}> =
        React.createElement(CourseDetails, {
          spHttpClient: this.context.spHttpClient,
          siteUrl: this.context.pageContext.web.absoluteUrl
        } as ICourseDetailsProps);

      ReactDOM.render(courseDtails, this._placeholder.domElement);
    }
    return Promise.resolve<void>();
  }
}
