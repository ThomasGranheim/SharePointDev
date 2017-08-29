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
    items?: Array<any>;
    isLoading?: boolean;
    isVisible?: boolean;
    loadingScripts?: boolean;
    errors?: Array<any>;
}

const LOG_SOURCE: string = 'CourseDetails';

export default class CourseDetails extends React.Component<ICourseDetailsProps, ICourseDetailsState> {
    constructor(props: ICourseDetailsProps, state: ICourseDetailsState) {
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            isVisible: false,
        };
    }
    @override
    public componentDidMount(): void {
        Log.info(LOG_SOURCE, 'React Element: CourseDetails  mounted');
        this.fetchData();
    }

    @override
    public componentWillUnmount(): void {
        Log.info(LOG_SOURCE, 'React Element: CourseDetails  unmounted');
    }

    @override
    public render(): React.ReactElement<{}> {
        let { isLoading, items, isVisible } = this.state;
        let { siteUrl, spHttpClient } = this.props;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {

            return (
                <div className={styles.CourseDetails}>
                    <div> Mountain hiking course  </div>
                    <div> 18:00 </div>
                    <div> 17/20 persons </div>
                    <div> Oslo, Norway</div>
                    <div> </div>
                    <CommandButton
                        iconProps={{ iconName: 'Smile' }}
                        title='ToggleButton'
                        ariaLabel='ToggleButton'>
                        Go hiking!
                        </CommandButton>
                </div>
            );
        }
    }
    private fetchData() {
        this.getListData();
    }
    private getListData(): void {
        // this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getByTitle('Source')/items`, SPHttpClient.configurations.v1)
        //     .then((response: SPHttpClientResponse): Promise<{ value: Array<IMegaMenuLinkItem> }> => {
        //         return response.json();
        //     }).then((response: { value: Array<IMegaMenuLinkItem> }) => { 
        //         this.setState({ taxonomy: response.value, isLoading: false });
        //     }); 
        this.setState({
            isLoading: false
        });
    }
}
