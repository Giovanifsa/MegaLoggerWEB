import Locale from './Locale';

class EN implements Locale {
    localeName = "English";
    loginUsername = 'Username';
    loginPassword = "Password";
    loginButton = "Login";
};

export default new EN();