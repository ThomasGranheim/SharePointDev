import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import * as $ from "jquery";
//import * as pnp from "sp-pnp-js";
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import styles from './MegaMenu.module.scss';
import { IMegaMenuLinkItem } from './IMegaMenuLinkItem';
import { MegaMenuData } from './MegaMenyData';


import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IMegaMenuProps {
    listName: string;
    siteUrl: string;
    spHttpClient: SPHttpClient;
}

export interface IMegaMenuState {
    items?: Array<any>;
    isLoading?: boolean;
    isVisible?: boolean;
    isHidden?: boolean;
    loadingScripts?: boolean;
    errors?: Array<any>;
}

const LOG_SOURCE: string = 'MegaMenu';
const MEGA_MENU_ID: string = 'MegaMenuId';

export default class MegaMenu extends React.Component<IMegaMenuProps, IMegaMenuState> {
    constructor(props: IMegaMenuProps, state: IMegaMenuState) {
        super(props);
        let items = Array<IMegaMenuLinkItem>();
        this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
        this.state = {
            items: [],
            isLoading: true,
            isVisible: false,
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
        let { isLoading, items, isVisible } = this.state;
        let { listName, siteUrl, spHttpClient } = this.props;
        let mmElements = items.map((section) => {
            let links = section.Links.map((link) => {
                return (
                    <li><a href={link.Url}>{link.Description}</a></li>
                );
            });
            return (
                <div id={MEGA_MENU_ID} className={styles.container}>
                    <div>{section.Title}</div>
                    <ul>{links}</ul>
                </div>
            );
        });
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {

            return (
                <div className={styles.Megamenu}>
                    {(isVisible) ? mmElements : null}
                    <div className={styles.toogleButton}>
                        <IconButton
                            iconProps={{ iconName: 'ChevronDown' }}
                            title='ChevronDown'
                            ariaLabel='ChevronDown'
                            onClick={this.toggleMegaMenu} />
                    </div>
                </div >
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
            items: MegaMenuData,
            isLoading: false
        })
    }
    private toggleMegaMenu() {
        if (this.state.isVisible) {
            this.setState({
                isVisible: false
            })
        }
        else {
            this.setState({
                isVisible: true
            })
        }
    }
}
