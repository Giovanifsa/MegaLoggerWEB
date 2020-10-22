export default interface IActionCallback<SO, EO> {
    onError(errorObject: EO) : void;
    onSuccess(successObject: SO) : void;
}