import Locale from './locale/Locale';
import EN from './locale/EN';
import PT_BR from './locale/PT_BR';

const localesImpl: { [key: string] : Locale } = {
    EN,
    PT_BR
};

export function getLocaleDefinition(localeName : string) : Locale {
    let localeImpl: Locale = localesImpl[localeName];

    if (!localeImpl) {
        return localesImpl['EN'];
    }

    return localeImpl;
}

