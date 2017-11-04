import { IWiki } from './IWiki';

export default class MockHttpClient {

    private static _items: IWiki[] = [
        { Title: 'Hvordan registrere sykdom?', Id: '1', Topic: 'Sykdom' },
        { Title: 'Ferielisten', Id: '2', Topic: 'Ferie' },
        { Title: 'Bonus', Id: '3', Topic: 'Lønn' },
        { Title: 'Har jeg rett til overtid?', Id: '4', Topic: 'Lønn' },
        { Title: 'Hvordan søke ferie?', Id: '5', Topic: 'Ferie' }
    ];

    public static get(restUrl?: string, options?: any): Promise<IWiki[]> {
        return new Promise<IWiki[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}