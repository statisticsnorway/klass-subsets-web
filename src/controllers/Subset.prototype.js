import {toId, sanitize} from '../utils/strings';
import {subsetDraft, STATUS_ENUM, LANGUAGE_CODE_ENUM, axceptablePeriod} from './defaults';
import {validate} from "./validator";

export function Subset (data) {

    const subset = {
        // step 1 Metadata
        _id: data?.id || data?._id || '',
        _shortName: data?.shortName || data?._shortName || '',
        _name: data?.name || data?._name || [],
        _administrativeStatus: data?.administrativeStatus || data?._administrativeStatus || 'INTERNAL',
        _validFrom: data?.validFrom || data?._validFrom || null,
        validUntil: data?.validUntil || null,
        createdBy: data?.createdBy || '',
        administrativeDetails: data?.administrativeDetails
            || [
            {
                administrativeDetailType: 'ANNOTATION',
                values: []
            },
            {
                administrativeDetailType: 'ORIGIN',
                values: []
            }
        ],
        _description: data?.description || data?._description || [],

        // step 2 Versions
        _version: data?.version || data?._version || '1',
        _previousSubsets: data?._previousSubsets || [],
        _versionRationale: data?.versionRationale || data?._versionRationale || [],
        versionValidFrom: data?.versionValidFrom || null,
        versionValidUntil: data?.versionValidUntil || null,

        // Step 3 and 4 Codes
        codes: data?.codes || [],

        // extra
        lastUpdatedDate: data?.lastUpdatedDate || null,
    }

    Object.assign(
        subset,
        editable(subset),
        restrictable(subset),

        nameControl(subset),
        descriptionControl(subset),
        versionRationaleControl(subset),
        versionPeriodControl(),
    );

    Object.defineProperty(subset, 'id', {
        get: () => { return subset._id; },
        set: (id = '') => {
            console.debug('Set id', id);

            if (subset.isEditableId()) {
                subset._id = sanitize(toId(id), subsetDraft?.maxLengthId);
            }
        }
    });

    Object.defineProperty(subset, 'shortName', {
        get: () => { return subset._shortName; },
        set: (shortName = '') => {
            console.debug('Set shortName', shortName);

            if (subset.isEditableShortName()) {
                subset._shortName = sanitize(shortName, subsetDraft?.maxLengthShortName);
                subset.id = shortName;
            }
        }
    });

    Object.defineProperty(subset, 'name', {
        get: () => { return subset._name; },
        set: (name = []) => {
            console.debug('Set name', name);

            if (subset.isEditableName()) {
                subset._name = name;
            }
        }
    });

    Object.defineProperty(subset, 'administrativeStatus', {
        get: () => { return subset._administrativeStatus; },
        set: (status = '') => {
            console.debug('Set administrativeStatus', status);

            if (subset.isEditableStatus() && STATUS_ENUM.includes(status)) {
                subset._administrativeStatus = status;
            }
        }
    });

    Object.defineProperty(subset, 'isPublished', {
        get: () => { return subset._administrativeStatus  === 'OPEN'; },
    });

    Object.defineProperty(subset, 'validFrom', {
        get: () => { return subset._validFrom; },
        set: (date = null) => {
            console.debug('Set validFrom', date, subset.isEditableValidFrom());

            if (subset.isEditableValidFrom()) {
                subset._validFrom = date;

                if (subset.isNew()) {
                    subset.versionValidFrom = date;
                }
            }
        }
    });

    Object.defineProperty(subset, 'version', {
        get: () => { return subset._version; }
    });

    Object.defineProperty(subset, 'previousSubsets', {
        get: () => { return subset._previousSubsets; },
        set: (list = []) => {
            console.debug('Set previousSubsets', list);

            // FIXME: restrict, validate the list
            subset._previousSubsets = list.sort((a, b) =>
                a.versionValidFrom < b.versionValidFrom ? -1 :
                    a.versionValidFrom > b.versionValidFrom ? 1 : 0);

            subset.versionValidUntil = subset.calculateVersionValidUntil();
        }
    });

    Object.defineProperty(subset, 'versionValidUntil', {
        get: () => { return subset._versionValidUntil; },
        set: (date = null) => {
            console.debug('Set versionValidUntil', date);

            if (!date || subset.isInAcceptablePeriod(date)) {
                subset._versionValidUntil = date;
            }
        }
    });

    Object.defineProperty(subset, 'versionRationale', {
        get: () => { return subset._versionRationale; },
        set: (versionRationale = []) => {
            console.debug('Set versionRationale', versionRationale);

            if (subset.isEditableVersionRationale()) {
                subset._versionRationale = versionRationale;
            }
        }
    });

    Object.defineProperty(subset, 'description', {
        get: () => { return subset._description; },
        set: (description = []) => {
            console.debug('Set description', description);

            if (subset.isEditableDescription()) {
                subset._description = description;
            }
        }
    });

    Object.defineProperty(subset, 'errors', {
        get: () => {
            console.debug('Get errors', subset._errors);

            return subset._errors;
            }
    });

    Object.defineProperty(subset, 'payload', {
        get: () => {
            const payload = {
                id: subset.id,
                shortName: subset.shortName,
                name: subset.name,
                administrativeStatus: subset.administrativeStatus,
                validFrom: subset.validFrom,
                validUntil: subset.validUntil,
                createdBy: subset.createdBy,
                administrativeDetails: subset.administrativeDetails,
                description: subset.description,
                version: subset.version,
                versionRationale: subset.versionRationale,
                versionValidFrom: subset.versionValidFrom,
                codes: subset.codes,
                lastUpdatedDate: new Date().toISOString()  // FIXME: has to be set on backend side+
            };
            Object.keys(payload).forEach((key) => (!payload[key] && delete payload[key]));
            return payload;
        }
    })

    return subset.validate();
}

const editable = (state = {}) => ({

    isNew() {
        return state._administrativeStatus === 'INTERNAL'
            && state._version === '1'
    },

    isEditableId() {
        return this.isNew();
    },

    isEditableShortName() {
        return true;
    },

    isEditableName() {
        return true;
    },

    isEditableStatus() {
        return true;
    },

    isEditableDescription() {
        return true;
    },

    isEditableValidFrom() {
        return this.isNew();
    },

    isEditableVersion() {
        return true;
    },

    isEditableVersionValidFrom() {
        return true;
    },

    isEditableVersionRationale() {
        return true;
    }
});

const restrictable = (state = {}) => ({

    isInAcceptablePeriod(date) {
        return date >= axceptablePeriod.from
            && date < axceptablePeriod.until;
    },

    isAcceptableLanguageCode(lang) {
        return LANGUAGE_CODE_ENUM.includes(lang);
    },

    validate() {
        state._errors = validate.subset(state);
        return state;
    }
});

const nameControl = (state = {}) => ({

    addName(name) {
        if (state.isEditableName()
            && state.name?.length < LANGUAGE_CODE_ENUM.length) {
            console.debug('addName', name);

            state.name = [...state.name, name];
        }
    },

    removeNameByIndex(index) {
        if (state.isEditableName()
            && index >= 0 && index < state.name?.length) {
            console.debug('removeNameByIndex', index);

            state.name = state.name?.filter((item, i) => i !== index)
        }
    },

    removeEmptyNames() {
        if (state.isEditableName()) {
            console.debug('removeEmptyNames');

            state.name = state.name.filter(item => item.languageText?.length > 0);
        }
    },

    updateNameTextByIndex(index = -1, text = '') {
        if (state.isEditableName()
            && index >= 0 && index < state.name?.length) 
        {
            console.debug('updateNameTextByIndex', index, text);

            state._name[index].languageText = sanitize(text, subsetDraft?.maxLengthName);
            if (!state.shortName && state.name?.length > 0) {
                state.id = toId(state.name[0].languageText);
            }
        }
    },

    updateNameLanguageByIndex(index = -1, lang = '') {
        if (state.isEditableName()
            && index >= 0 && index < state.name?.length
            && state.isAcceptableLanguageCode(lang)) 
        {
            console.debug('updateNameLanguageByIndex', index, lang);

            state._name[index].languageCode = lang;
        }
    }

});

const descriptionControl = (state = {}) => ({

    addDescription(description) {
        if (state.isEditableDescription()
            && state.description?.length < LANGUAGE_CODE_ENUM.length) {
            console.debug('addDescription', description);

            state.description = [...state.description, description];
        }
    },

    removeDescriptionByIndex(index) {
        if (state.isEditableDescription()
            && index >= 0 && index < state.description?.length) {
            console.debug('removeDescriptionByIndex', index);

            state.description = state.description?.filter((item, i) => i !== index)
        }
    },

    removeEmptyDescriptions() {
        if (state.isEditableDescription()) {
            console.debug('removeEmptyDescriptions');

            state.description = state.description.filter(item => item.languageText?.length > 0);
        }
    },

    updateDescriptionTextByIndex(index = -1, text = '') {
        if (state.isEditableDescription()
            && index >= 0 && index < state.description?.length) 
        {
            console.debug('updateDescriptionTextByIndex', index, text);

            state._description[index].languageText = sanitize(text, subsetDraft?.maxLengthDescription);
        }
    },

    updateDescriptionLanguageByIndex(index = -1, lang = '') {
        if (state.isEditableDescription()
            && index >= 0 && index < state.description?.length
            && state.isAcceptableLanguageCode(lang)) 
        {
            console.debug('updateDescriptionLanguageByIndex', index, lang);

            state._description[index].languageCode = lang;
        }
    }
});

const versionRationaleControl = (state = {}) => ({

    addVersionRationale(versionRationale) {
        if (state.isEditableVersionRationale()
            && state.versionRationale?.length < LANGUAGE_CODE_ENUM.length) {
            console.debug('addVersionRationale', versionRationale);

            state.versionRationale = [...state.versionRationale, versionRationale];
        }
    },

    removeVersionRationaleByIndex(index) {
        if (state.isEditableVersionRationale()
            && index >= 0 && index < state.versionRationale?.length) {
            console.debug('removeVersionRationaleByIndex', index);

            state.versionRationale = state.versionRationale?.filter((item, i) => i !== index)
        }
    },

    removeEmptyVersionRationales() {
        if (state.isEditableVersionRationale()) {
            console.debug('removeEmptyVersionRationales');

            state.versionRationale = state.versionRationale.filter(item => item.languageText?.length > 0);
        }
    },


    updateVersionRationaleTextByIndex(index = -1, text = '') {
        if (state.isEditableVersionRationale()
            && index >= 0 && index < state.versionRationale?.length)
        {
            console.debug('updateVersionRationaleTextByIndex', index, text);

            state._versionRationale[index].languageText = sanitize(text, subsetDraft?.maxLengthDescription);
        }
    },

    updateVersionRationaleLanguageByIndex(index = -1, lang = '') {
        if (state.isEditableVersionRationale()
            && index >= 0 && index < state.versionRationale?.length
            && state.isAcceptableLanguageCode(lang))
        {
            console.debug('updateVersionRationaleLanguageByIndex', index, lang);

            state._versionRationale[index].languageCode = lang;
        }
    }
});

const versionPeriodControl = (state = {}) => ({

    calculateVersionValidUntil() {
        console.debug('calculateVersionValidUntil');

        const exists = state.previousSubsets?.find(v => v.version === state.version);
        if (exists) {
            const next = state.previousSubsets.filter(v => v.versionValidFrom > exists.versionValidFrom)
                .sort((a, b) =>
                    a.versionValidFrom < b.versionValidFrom ? -1 :
                        a.versionValidFrom > b.versionValidFrom ? 1 : 0)[0];
            return next?.versionValidFrom || state._versionValidUntil || null
        }
        return state._versionValidUntil;
    }
});
