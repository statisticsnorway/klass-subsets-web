import {languages as defaultLanguages} from "../controllers/defaults";
import {clone} from "../utils/arrays";

export function availableLanguages() {
    return clone(defaultLanguages);
}

export function nextDefaultName(items) {
    const languages = availableLanguages();
    const used = items.map(name => name.lang);
    const unused = languages.find(lang => !used.includes(lang.abbr));
    return items.length < 1
        ? {text: "", lang: languages.find(lang => lang.default).abbr}
        : items.length < languages.length ?
            {text: "", lang: unused.abbr}
            : null;
}

export function disableUsed(languages, used) {
    return languages.forEach((lang) => used.includes(lang.abbr)
        ? lang.disabled = true
        : lang.disabled = false);
}