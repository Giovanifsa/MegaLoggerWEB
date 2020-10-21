import Locale, { LocalePhrase } from './Locale';

class EN implements Locale {
    localeName = new LocalePhrase("English");
    loginUsername = new LocalePhrase('Username');
    loginPassword = new LocalePhrase("Password");
    loginButton = new LocalePhrase("Login");
    loginSuccess = new LocalePhrase("Login successful - Welcome {0}!");
    myAccount = new LocalePhrase("My Account - {0}");
    endSession = new LocalePhrase("End Session")
};

export default new EN();