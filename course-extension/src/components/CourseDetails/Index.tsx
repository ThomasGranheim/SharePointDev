import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
//import * as pnp from "sp-pnp-js";
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';

import styles from './CourseDetails.module.scss';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface ICourseDetailsProps {
    siteUrl: string;
    spHttpClient: SPHttpClient;
}

export interface ICourseDetailsState {
    loadingScripts?: boolean;
    errors?: Array<any>;
}

const LOG_SOURCE: string = 'CourseDetails';

export default class CourseDetails extends React.Component<ICourseDetailsProps, ICourseDetailsState> {
    constructor(props: ICourseDetailsProps, state: ICourseDetailsState) {
        super(props);
    }
    @override
    public componentDidMount(): void {
        Log.info(LOG_SOURCE, 'React Element: CourseDetails  mounted');
    }

    @override
    public componentWillUnmount(): void {
        Log.info(LOG_SOURCE, 'React Element: CourseDetails  unmounted');
    }

    @override
    public render(): React.ReactElement<{}> {
        let { siteUrl, spHttpClient } = this.props;
        return (
            <div className={styles.CourseDetails}>
                <div>
                    <strong>This site contains classified information</strong>

                </div>
                <div>
                    Level <strong>Restricted</strong>
                </div>
                <div>
                    <a href={this.props.siteUrl}>Read the manual!</a>
                </div>
            </div>
        );
    }
}
