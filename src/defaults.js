export const languages = [
    { languageCode: 'nb',
        IETF: 'nb-NO',
        full: 'Norsk bokmål',
        default: true,
        site: true,
        draft: true
    },
    { languageCode: 'nn',
        IETF: 'nn-NO',
        full: 'Nynorsk',
        site: false,
        draft: true
    },
    { languageCode: 'en',
        IETF: 'en-US',
        full: 'English',
        site: true,
        draft: true
    }
];

export const subsetDraft = {
    namePrefix: [
        { languageCode: 'nb', languageText: 'Uttrekk for ' },
        { languageCode: 'nn', languageText: 'Uttrekk for ' },
        { languageCode: 'en', languageText: 'Subset for ' }
    ],
    maxLengthId: 128,
    maxLengthName: 250,
    maxLengthShortName: 250,
    maxLengthDescription: 2500,
    maxLengthVersionRationale: 2500
};

// // TODO: defaults for subset description in different languages
// export const STATUS_ENUM = [
//     'DEPRECATED',
//     'DRAFT',
//     'INTERNAL',
//     'OPEN'
// ];

export const acceptablePeriod = {
    from: new Date('1800-01-01').toJSON(),
    until: new Date('2300-01-01').toJSON()
};
