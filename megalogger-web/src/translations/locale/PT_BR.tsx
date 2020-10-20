import Locale, { LocalePhrase } from './Locale';

class PT_BR implements Locale {
    localeName = new LocalePhrase("Português Brasileiro");
    loginUsername = new LocalePhrase('Nome de Usuário');
    loginPassword = new LocalePhrase("Senha");
    loginButton = new LocalePhrase("Iniciar Sessão");
    loginSuccess = new LocalePhrase("Sessão iniciada com sucesso - Bem-vindo(a) {0}!");
};

export default new PT_BR();