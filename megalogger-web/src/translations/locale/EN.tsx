import Locale, { LocalePhrase } from './Locale';

class EN implements Locale {
    localeName = new LocalePhrase("English");
    loginUsername = new LocalePhrase('Username');
    loginPassword = new LocalePhrase("Password");
    loginButton = new LocalePhrase("Login");
    loginSuccess = new LocalePhrase("Login successful - Welcome {0}!");
};

export default new EN();