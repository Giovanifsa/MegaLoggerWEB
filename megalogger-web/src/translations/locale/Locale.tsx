export class LocalePhrase {
    private phrase: string;

    constructor(phrase: string) {
        this.phrase = phrase;
    }

    public getPhrase(...args: any[]) {
        let formatedPhrase = this.phrase;

        for (let varIndex = 0; varIndex < args.length; varIndex++) {
            formatedPhrase = formatedPhrase.replace("{" + varIndex + "}", args[varIndex]);
        }

        return formatedPhrase;
    }
};

export default interface Locale {
    localeName: LocalePhrase;
    loginUsername: LocalePhrase;
    loginPassword: LocalePhrase;
    loginButton: LocalePhrase;
    loginSuccess: LocalePhrase;
};