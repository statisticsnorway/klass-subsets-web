import {languages as defaultLanguages, subsetDraft} from '../controllers/defaults';
import {clone} from './arrays';

export function availableLanguages() {
    return clone(defaultLanguages);
}

export function nextDefaultName(items) {
    if (items.length < 1) {
        return {text: subsetDraft.namePrefix, lang: availableLanguages().find(lang => lang.default).abbr};
    }
    const used = items.map(item => item.lang);
    const unused = availableLanguages().find(lang => !used.includes(lang.abbr));
    return unused ? {text: subsetDraft.namePrefix, lang: unused.abbr} : null;
}

export function disableUsed(languages, used) {
    return languages.forEach((lang) => lang.disabled = used.includes(lang.abbr));
}