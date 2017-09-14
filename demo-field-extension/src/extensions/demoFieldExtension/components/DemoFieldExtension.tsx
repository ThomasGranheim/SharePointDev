import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import styles from './DemoFieldExtension.module.scss';

export interface IDemoFieldExtensionProps {
  text: string;
}

interface IIcon {
  color: string;
  icon: string;
}

const LOG_SOURCE: string = 'DemoFieldExtension';

export default class DemoFieldExtension extends React.Component<IDemoFieldExtensionProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: DemoFieldExtension mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: DemoFieldExtension unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    let icon: IIcon = this.getIcon(this.props.text);
    return (
      <div className={styles.cell}>
        <IconButton
          style={{ backgroundColor: 'transparent', color: icon.color }}
          disabled={false}
          checked={true}
          iconProps={{ iconName: icon.icon }}
          title='GenericButton'
          ariaLabel='GenericButton' />
      </div>
    );
  }

  private getIcon(fieldValue): IIcon {
    switch (fieldValue) {
      case 'Super happy':
        return { color: '#107c10', icon: 'Emoji' };
      case 'Good':
        return { color: '#00B294', icon: 'Emoji2' };
      case 'Bad':
        return { color: '#e81123', icon: 'EmojiDisappointed' };
      case 'Ok':
        return { color: '#666666', icon: 'EmojiNeutral' };
      default:
        return { color: '#666666', icon: 'EmojiNeutral' };
    }
  }
}
