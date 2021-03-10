import { acceptablePeriod } from 'defaults';
import { eu } from 'utils';

export const errorsControl = (state = {}) => ({

    validateId() {
        return !state.id
            || state.id.length === 0
            || !(typeof state.id === 'string'
            || state.id instanceof String)
                ? ['ID is a mandatory field']
                : !(/([a-z0-9-_])$/.test(state.id))
                    ? ['Only lower case letters, numbers, dashes, and underscores are allowed']
                    : [];
    },

    validateName() {
        return state.name?.length > 0
            ? []
            : ['At least one name is required'];
    },

    // validateValidFrom() {
    //     return !state.validFrom
    //         ? ['A valid from date is required']
    //         : !state.isInAcceptablePeriod(state._validFrom)
    //             ? [`Only dates between ${
    //                 eu(acceptablePeriod.from)
    //                 } and ${
    //                 eu(acceptablePeriod.until)
    //                 } are acceptable`]
    //             : [];
    // },

    validateValidUntil() {
        return !state._validUntil
            || state.isInAcceptablePeriod(state._validUntil)
                ? []
                : [`Only dates between ${
                    eu(acceptablePeriod.from)
                    } and ${
                    eu(acceptablePeriod.until)
                    } are acceptable`];
    },

    validatePeriod(from, to) {
        return !from || !to
            ? []
            : from > to
                && state.isInAcceptablePeriod(from)
                && state.isInAcceptablePeriod(to)
                ? ['Period cannot start later than end']
                : from === to
                    ? ['Period cannot include and exclude the same day']
                    : [];
    },

    validateVersionPeriod() {
        return this.validatePeriod(state.versionValidFrom, state.versionValidUntil);
    },

    // validateSubsetPeriod() {
    //     return this.validatePeriod(state.validFrom, state.validUntil);
    // },

    validateVersionValidFrom() {
        //console.debug('validateVersionValidFrom');

        return !state._versionValidFrom
            ? ['A valid version from date is required']
            : !state.isInAcceptablePeriod(state._versionValidFrom)
                ? [`Only dates between ${
                    eu(acceptablePeriod.from)
                    } and ${
                        eu(acceptablePeriod.until)
                    } are acceptable`]
                : !state.isNewVersion()
                    ? []
                    : state._versionValidFrom > state._validUntil
                        ? ['Versions cannot have gaps on validity periods']
                        : state.isInCoveredPeriod(state._versionValidFrom)
                            ? ['This date is already covered in previous versions']
                            : [];
    },

    // validateVersionValidUntil() {
    //     return !state._versionValidUntil
    //     || state.isInAcceptablePeriod(state._versionValidUntil)
    //         ? []
    //         : [`Only dates between ${
    //             eu(acceptablePeriod.from)
    //             } and ${
    //             eu(acceptablePeriod.until)
    //             } are acceptable`];
    // },

    // validateOwningSection() {
    //     return state.owningSection?.length > 0 ? [] : ['Owner is required'];
    // },

    validateCodes() {
        return state.codes?.length > 0 ? [] : ['At least one code is required'];
    },

    validate() {
        //console.debug('validate');

        return {
/*            id: state.validateId(),
            name: state.validateName(),
            validFrom: state.validateValidFrom(),
            validUntil: state.validateValidUntil(),
            period: state.validateSubsetPeriod(),
            owningSection: state.validateOwningSection(),
            annotation: [],
            description: [],
            origin: [],
            administrativeStatus: [],
            versionValidFrom: state.validateVersionValidFrom(),
            versionValidUntil: state.validateVersionValidUntil(),
            versionPeriod: state.validateVersionPeriod(),
            codes: state.validateCodes()*/
        };
    }

});
