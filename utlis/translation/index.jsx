import { en } from '../en';
import { ar } from '../ar';
const translationi18n = {
    en,
    ar
};
let translation = {};
const translationInit = (lang) => {
    translation = translationi18n[lang];
};
const translate = (key) => {
    return translation[key];
};

export {
    translationInit,
    translate
};
