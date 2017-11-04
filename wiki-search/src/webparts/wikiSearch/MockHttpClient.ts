import { IWiki } from './IWiki';

export default class MockHttpClient {

    private static _items: IWiki[] = [
        { Title: 'Wiki Page 1', Id: '1' },
        { Title: 'Wiki Page 2', Id: '2' },
        { Title: 'Wiki Page 3', Id: '3' },
        { Title: 'Wiki Page 4', Id: '4' },
        { Title: 'Wiki Page 5', Id: '5' }
    ];

    public static get(restUrl?: string, options?: any): Promise<IWiki[]> {
        return new Promise<IWiki[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}