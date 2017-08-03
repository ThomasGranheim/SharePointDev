import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import * as $ from "jquery";
//import * as pnp from "sp-pnp-js";
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import styles from './MegaMenu.module.scss';
import { IMegaMenuLinkItem } from './IMegaMenuLinkItem';
import { MMData } from './MMData';


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
            let headerLinks = section.HeaderLinks.map((hederLink) => {
                let links = hederLink.Links.map((link) => {
                    return <div className={styles.link}><a href={link.Url}>{link.Description}</a></div>
                })
                return (
                    <div className={styles.headerLink}>
                        <a className={styles.headerLinkLabel} href={hederLink.Url}>{hederLink.Description}</a>
                        <div>
                            {links}
                        </div>
                    </div>
                );
            });
            return (
                <div className={styles.container}>
                    <div className={styles.headerLinkContainer}>{headerLinks}</div>
                </div>
            );
        });
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {

            return (
                <div className={styles.Megamenu}>
                    {(isVisible) ? mmElements : null}
                    <div onClick={this.toggleMegaMenu} className={styles.toogleButton}>
                        <CommandButton
                            iconProps={(isVisible) ? { iconName: 'ChevronUp' } : { iconName: 'ChevronDown' }}
                            title='ChevronDown'
                            ariaLabel='ChevronDown'>
                            Navigate
                        </CommandButton>
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
            items: MMData,
            isLoading: false
        })
    }
    /**
     * Toggles the mega menu
     */
    private toggleMegaMenu() {
        (this.state.isVisible) ? this.setState({ isVisible: false }) : this.setState({ isVisible: true });
        Log.info(LOG_SOURCE, 'React Element: Toggle Mega Menu');
    }
}
