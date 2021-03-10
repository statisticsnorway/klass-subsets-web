import { subsetDraft } from 'defaults';
import {
    toId, sanitize, nextDefaultName,
    orderByValidFromAsc, orderByValidFromDesc,
    sanitizeArray, toCodeId
} from 'utils';
import { nameControl, errorsControl, versionable,
    descriptionControl, versionRationaleControl,
    originsControl, codesControl, editable, restrictable
} from '../subset';

// FIXME: decide which version should be the default one
function defaultVersion(versions) {
    // console.log('defaultVersion', versions?.length > 0 ? versions[0] : null);

    return versions?.length > 0 ? versions[0] : null;
    // return versions?.length > 0 ? versions[versions.length-1] : null;
}

export function Subset (data) {
    const subset = {
        _id: data?.id || data?._id || '',
        _shortName: data?.shortName || data?._shortName || '',
        _name: data?.name || data?._name || [],
        _classificationFamily: data?.classificationFamily || data?._classificationFamily || '',
        _owningSection: data?.owningSection || data?._owningSection || '',
        _description: data?.description || data?._description || [],
        _versions: data?.versions || data?._versions || [{
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
        }],

        // internal controls
        // FIXME: default - a version valid at loading date
        _currentVersion: data?._currentVersion || defaultVersion(data?.versions || data?._versions),
        _origins: data?._origins || [],

        // not protected
        lastModified: data?.lastModified || null,
        createdDate: data?.createdDate || null
    };

    Object.assign(
        subset,
        editable(subset),
        restrictable(subset),
        versionable(subset),

        nameControl(subset),
        descriptionControl(subset),
        versionRationaleControl(subset),
        originsControl(subset),
        codesControl(subset),
        errorsControl(subset)
    );

    Object.defineProperty(subset, 'id', {
        get: () => { return subset._id; },
        set: (id = '') => {
            //console.debug('Set id', id);

            if (subset?.isEditableId()) {
                subset._id = sanitize(toId(id), subsetDraft?.maxLengthId);
            }
        }
    });

    Object.defineProperty(subset, 'shortName', {
        get: () => { return subset._shortName; },
        set: (shortName = '') => {
            //console.debug('Set shortName', shortName);

            if (subset.isEditableShortName()) {
                subset._shortName = sanitize(shortName, subsetDraft?.maxLengthShortName);
                subset.id = shortName;
            }
        }
    });

    Object.defineProperty(subset, 'name', {
        get: () => { return subset._name; },
        set: (name = []) => {
            //console.debug('Set name', name);

            if (subset.isEditableName()) {
                subset._name = name;
            }
        }
    });

    // FIXME: demo workaround
    Object.defineProperty(subset, 'metadataToBeSaved', {
        // FIXME: hardcoded workaround
        get: () => { return subset.isNew(); },
    });

    Object.defineProperty(subset, 'owningSection', {
        get: () => { return subset._owningSection; },
        set: (owningSection = '') => {
            //console.debug('Set owningSection', owningSection, subset.isEditableowningSection());

            if (subset.isEditableOwningSection()) {
                subset._owningSection = owningSection;
            }
        }
    });

    Object.defineProperty(subset, 'classificationFamily', {
        get: () => { return subset._classificationFamily; },
        set: (classificationFamily = '') => {
            //console.debug('Set classificationFamily', classificationFamily, subset.isEditableClassificationFamily());

            if (subset.isEditableClassificationFamily()) {
                subset._classificationFamily = classificationFamily;
            }
        }
    });

    Object.defineProperty(subset, 'description', {
        get: () => { return subset._description; },
        set: (description = []) => {
            //console.debug('Set description', description);

            if (subset.isEditableDescription()) {
                subset._description = description;
            }
        }
    });

    Object.defineProperty(subset, 'validFrom', {
        get: () => { return subset.earliestPublishedVersion?.validFrom; }
    });

    Object.defineProperty(subset, 'validUntil', {
        get: () => { return subset.latestPublishedVersion?.validUntil }
    });

    Object.defineProperty(subset, 'versions', {
        get: () => { return subset?._versions; },
        set: ( versions = [] ) => {
            // console.debug('Set versions', versions);

            subset._versions = [ ...versions ]
        }
    });

    Object.defineProperty(subset, 'publishedVersions', {
        get: () => { return subset?._versions?.filter(v => v.administrativeStatus === 'OPEN'); },
    });

    Object.defineProperty(subset, 'earliestPublishedVersion', {
        get: () => {
            if (!subset?.versions) {
                return null;
            }
            return orderByValidFromAsc(subset?.publishedVersions)[0]; },
    });

    Object.defineProperty(subset, 'latestPublishedVersion', {
        get: () => {
            if (!subset?.versions) {
                return null;
            }
            return orderByValidFromDesc(subset?.publishedVersions)[0];
       },
    });

    Object.defineProperty(subset, 'drafts', {
        get: () => { return subset?._versions?.filter(v => v.administrativeStatus === 'DRAFT'); },
    });

    Object.defineProperty(subset, 'currentVersion', {
        get: () => {
            // console.debug('Get currentVersion', subset._currentVersion);

            return subset._versions?.find(v => v.versionId === subset._currentVersion?.versionId);
        },
        set: ( chosen = {} ) => {
            // console.debug('Set currentVersion', chosen);

            subset._currentVersion = subset.versions?.find(v => v.versionId === chosen?.versionId) || {};
            if (subset._currentVersion?.versionRationale?.length === 0) {
                subset.versionRationale = [ nextDefaultName([]) ];
            }
        }
    });

    Object.defineProperty(subset, 'versionLastModified', {
        get: () => { return subset?.currentVersion?.lastModified; },
    });

    Object.defineProperty(subset, 'versionCreatedDate', {
        get: () => { return subset?.currentVersion?.createdDate; },
    });

    Object.defineProperty(subset, 'versionId', {
        get: () => { return subset?._currentVersion?.versionId; },
    });

    // FIXME not implemented yet
    Object.defineProperty(subset, 'versionToBeSaved', {
        get: () => { return subset.isNewVersion() },
    });

    Object.defineProperty(subset, 'administrativeStatus', {
        get: () => { return subset?.currentVersion?.administrativeStatus; },
    });

    Object.defineProperty(subset, 'isPublished', {
        get: () => { return subset.administrativeStatus  === 'OPEN';},
    });

    Object.defineProperty(subset, 'versionValidFrom', {
        get: () => {
            //console.debug('Get versionValidFrom', subset.currentVersion?.validFrom)

            return subset.currentVersion?.validFrom;
            },
        set: (date = null) => {
            //console.debug('Set versionValidFrom', date);

            if (subset.isEditableVersionValidFrom) {
                subset.currentVersion.validFrom = date ? new Date(date)?.toJSON().substr(0, 10) : null;
            }
        }
    });

    Object.defineProperty(subset, 'versionValidUntil', {
        get: () => {
            //console.debug('Get versionValidUntil', subset.currentVersion?.validUntil)

            return subset.currentVersion?.validUntil;
        },
        set: (date = null) => {
            //console.debug('Set versionValidUntil', date, subset.isEditableVersionValidUntil());

            if (subset.isEditableVersionValidUntil()) {
                subset.currentVersion.validUntil = date ? new Date(date)?.toJSON().substr(0, 10) : null;
            }
        }
    });

    Object.defineProperty(subset, 'versionRationale', {
        get: () => {
            // console.debug('Get versionRationale', subset.currentVersion?.versionRationale);

            return subset.currentVersion?.versionRationale;
            },
        set: (versionRationale = []) => {
            // console.debug('Set versionRationale', versionRationale);

            if (subset.isEditableVersionRationale() && versionRationale?.length > 0) {
                subset.currentVersion.versionRationale = sanitizeArray(
                    versionRationale,
                    subsetDraft.maxLengthVersionRationale
                );
            }
        }
    });

    Object.defineProperty(subset, 'origins', {
        get: () => {
            // console.debug({origins: subset._origins});

            if (subset?._origins?.length === 0) {
                subset.initOrigins();
            }

            if (subset.currentVersion?.codes) {
                return new Set([...subset?._origins,
                    ...subset?.currentVersion?.codes?.map(c => c.classificationId)
                ]);
            }

            return new Set([...subset?._origins]);
        }
    });

    Object.defineProperty(subset, 'codesMap', {
        get: () => {
            console.log(subset, 'subset')
            console.log(subset.currentVersion, 'currentVersion')
            return new Map(subset?.currentVersion?.codes?.map(code => [
                toCodeId(code),
                code
            ])); },
    });

    Object.defineProperty(subset, 'codes', {
        get: () => {
            return subset?.currentVersion?.codes
        },
        set: (codes = []) => {
            // console.debug('Set codes', codes, subset?.currentVersion);

            if (subset.isEditableCodes() && subset.currentVersion) {
                subset.currentVersion.codes = codes.map(code => ({
                        id: toCodeId(code),
                        ...code
                    }));
                subset.reorderCodes();
                subset.rerankCodes();
            }
        }
    });

    Object.defineProperty(subset, 'errors', {
        get: () => {
            //console.debug('Get errors', subset._errors);

            return subset.validate();
        }
    });

    Object.defineProperty(subset, 'metadataPayload', {
        // TESTME
        // DOCME
        get: () => {
            const payload = {
                id: subset.id,
                classificationType: 'Subset',
                shortName: subset.shortName,
                name: subset.name,
                owningSection: subset.owningSection,
                classificationFamily: subset.classificationFamily,
                description: subset.description,
            };
            Object.keys(payload).forEach((key) => (
                (!payload[key] || payload[key] === '')
                && delete payload[key])
            );
            return payload;
        }
    });

    Object.defineProperty(subset, 'versionPayload', {
        // TESTME
        // DOCME
        get: () => {
            const payload = {
                subsetId: subset.id,
                administrativeStatus: 'DRAFT',
                //administrativeDetails: subset.administrativeDetails,
                versionRationale: subset.versionRationale,
                validFrom: subset.versionValidFrom,
                validUntil: subset.versionValidUntil,
                codes: subset.codes
            };
            Object.keys(payload).forEach((key) => (
                (!payload[key] || payload[key] === '')
                && delete payload[key])
            );
            return payload;
        }
    });

    Object.defineProperty(subset, 'publishVersionPayload', {
        get: () => {
            return {
                ...subset.versionPayload,
                administrativeStatus: 'OPEN'
            };
        }
    });

    return subset;
}




