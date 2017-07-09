import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as React from 'react';
import * as pnp from "sp-pnp-js";

import { ITaxonomyItem } from './ITaxonomyItem';
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import styles from './MegaMenu.module.scss';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IMegaMenuProps {
    listName: string;
    siteUrl: string;
    spHttpClient: SPHttpClient
}

export interface IMegaMenuState {
    taxonomy?: Array<any>;
    isLoading?: boolean;
    isHidden?: boolean;
    loadingScripts?: boolean;
    errors?: Array<any>;
}


const LOG_SOURCE: string = 'MegaMenu';

export default class MegaMenu extends React.Component<IMegaMenuProps, IMegaMenuState> {
    constructor(props: IMegaMenuProps, state: IMegaMenuState) {
        super(props);
        let taxonomy = Array<ITaxonomyItem>();
        this.state = {
            taxonomy: taxonomy,
            isLoading: true,
            isHidden: true
        };
    }
    @override
    public componentDidMount(): void {
        Log.info(LOG_SOURCE, 'React Element: MegaMenu  mounted');
        this.fetchData();
    }

    @override
    public componentWillUnmount(): void {
        Log.info(LOG_SOURCE, 'React Element: MegaMenu  unmounted');
    }

    @override
    public render(): React.ReactElement<{}> {
        let { isLoading, taxonomy } = this.state;
        let { listName, siteUrl, spHttpClient } = this.props;
        let sourceCardElements = taxonomy.map((source, i) => {
            return (<div>{source.Title}</div>);
        });
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {
            return (
                <div>
                    {sourceCardElements}
                </div>
            );
        }
    }
    private fetchData() {
        this.getListData();
    }
    private getListData(): void {
        this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getByTitle('Source')/items`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse): Promise<{ value: Array<ITaxonomyItem> }> => {
                return response.json();
            }).then((response: { value: Array<ITaxonomyItem> }) => {
                this.setState({ taxonomy: response.value, isLoading: false });
            });
    }

    private _loadSPJSOMScripts() {
        const siteColUrl = this.props.siteUrl;
        try {
            SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/init.js', {
                globalExportsName: '$_global_init'
            })
                .then((): Promise<{}> => {
                    return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/MicrosoftAjax.js', {
                        globalExportsName: 'Sys'
                    });
                })
                .then((): Promise<{}> => {
                    return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.Runtime.js', {
                        globalExportsName: 'SP'
                    });
                })
                .then((): Promise<{}> => {
                    return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.js', {
                        globalExportsName: 'SP'
                    });
                })
                .then((): Promise<{}> => {
                    return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.taxonomy.js', {
                        globalExportsName: 'SP'
                    });
                })
                .then((): void => {
                    this.setState({ loadingScripts: false });
                })
                .catch((reason: any) => {
                    this.setState({ loadingScripts: false, errors: [...this.state.errors, reason] });
                });
        } catch (error) {
            this.setState({ loadingScripts: false, errors: [...this.state.errors, error] });
        }
    }
}
