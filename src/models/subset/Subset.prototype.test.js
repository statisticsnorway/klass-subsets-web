import { Subset } from './Subset.prototype';
import { describe, it } from '@jest/globals'

describe('Subset prototype: default values', () => {
    it('should by default set ID to empty string', () => {
        expect(Subset().id).toBe('');
    });

    it('should by default set shortName to empty string', () => {
        expect(Subset().shortName).toBe('');
    });

    it('should by default set shortName to empty array', () => {
        expect(Subset().name).toEqual([]);
    });

    it('should by default set owningSection to empty string', () => {
        expect(Subset().owningSection).toBe('');
    });

    it('should by default set classificationFamily to empty string', () => {
        expect(Subset().classificationFamily).toBe('');
    });

    it('should by default set description to empty array', () => {
        expect(Subset().description).toEqual([]);
    });

    it('should by default set version to first init version', () => {
        expect(Subset().versions).toStrictEqual([{
            versionId: '1',
            administrativeStatus: 'INTERNAL',
            versionRationale: [],
            validFrom: null,
            validUntil: null,
            administrativeDetails: [{
                administrativeDetailType: 'ORIGIN',
                values: []
            }],
            codes: []
        }]);
    });

    it('should by default set _currentVersion to a version', () => {
        expect(Subset().currentVersion).not.toBeNull();
    });
});

describe('Subset prototype: defined properties on an initial subset', () => {
    it('should initiate a Subset as not published', () => {
        expect(Subset().isPublished).toBeFalsy();
    });

/*    FIXME: there are initial errors - required fields
    it('should initiate a Subset with no errors', () => {
        expect(Subset().errors).toBeUndefined();
    });*/

    it('should create a copy of metadata with classification type SUBSET with no effect on the actual metadata', () => {
        const subset = Subset();
        expect(subset.metadataPayload.classificationType).toBe('Subset');
        expect(subset.classificationType).toBeUndefined();
    });

/*    it('should create a copy of a current version with status DRAFT with no effect on the actual status', () => {
        const subset = Subset();
        expect(subset.versionPayload.administrativeStatus).toBe('DRAFT');
        expect(subset.administrativeStatus).toBe('INTERNAL');
    });

    it('should create a copy of a Subset with status OPEN with no effect on the actual status', () => {
        const subset = Subset();
        expect(subset.publishVersionPayload.administrativeStatus).toBe('OPEN');
        expect(subset.administrativeStatus).toBe('INTERNAL');
    });*/
});

describe('Subset prototype: published versions', () => {
    // arrange
    const given = Subset({
        _versions: [
            {
                version: '1',
                administrativeStatus: 'OPEN'
            },
            {
                version: '2',
                administrativeStatus: 'DRAFT'
            },
            {
                version: '3',
                administrativeStatus: 'OPEN'
            },
            {
                version: '4',
                administrativeStatus: 'INITIAL'
            },
            {
                version: '5',
                administrativeStatus: 'OPEN'
            }
        ]
    });

    // act
    const result = given.publishedVersions;

    it('should return all published versions available', () => {
        // assert
        expect(result.length).toBe(3);

    });

    it('should only return versions with status OPEN', () => {
        // assert
        const statuses = new Set(result.map(v => v.administrativeStatus));
        expect(statuses.size).toBe(1);
        expect([...statuses]).toEqual(expect.arrayContaining(['OPEN']));
    });
});

describe('Subset prototype: earliest published version', () => {

    it('should only return the earliest version with status OPEN', () => {

        // arrange
        const given = Subset({
            _versions: [
                {
                    version: '1',
                    administrativeStatus: 'OPEN',
                    validFrom: '2001-01-01',
                    validUntil: '2002-01-01'
                },
                {
                    version: '2',
                    administrativeStatus: 'DRAFT',
                    validFrom: '2001-01-01',
                    validUntil: '2005-01-01'
                },                {
                    version: '3',
                    administrativeStatus: 'OPEN',
                    validFrom: '2000-01-01',
                    validUntil: null
                },
                {
                    version: '4',
                    administrativeStatus: 'INITIAL',
                    validFrom: '2002-01-01',
                    validUntil: null
                },
                {
                    version: '5',
                    administrativeStatus: 'OPEN',
                    validFrom: '2002-01-01',
                    validUntil: '2003-01-01'
                }
            ]
        });

        // act
        const result = given.earliestPublishedVersion;

        // assert
        expect(result.version).toBe('3');
        expect(result.validFrom).toBe('2000-01-01');
        expect(result.administrativeStatus).toBe('OPEN');

    });
});

describe('Subset prototype: latest published version', () => {

    it('should only return the latest version with status OPEN', () => {

        // arrange
        const given = Subset({
            _versions: [
                {
                    version: '1',
                    administrativeStatus: 'OPEN',
                    validFrom: '2001-01-01',
                    validUntil: '2002-01-01'
                },
                {
                    version: '2',
                    administrativeStatus: 'DRAFT',
                    validFrom: '2001-01-01',
                    validUntil: '2005-01-01'
                },                {
                    version: '3',
                    administrativeStatus: 'OPEN',
                    validFrom: '2000-01-01',
                    validUntil: null
                },
                {
                    version: '4',
                    administrativeStatus: 'INITIAL',
                    validFrom: '2002-01-01',
                    validUntil: null
                },
                {
                    version: '5',
                    administrativeStatus: 'OPEN',
                    validFrom: '2002-01-01',
                    validUntil: '2003-01-01'
                }
            ]
        });

        // act
        const result = given.latestPublishedVersion;

        // assert
        expect(result.version).toBe('5');
        expect(result.validFrom).toBe('2002-01-01');
        expect(result.administrativeStatus).toBe('OPEN');

    });
});
