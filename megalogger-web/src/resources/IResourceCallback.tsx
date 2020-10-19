export default interface IResourceCallback<SO, EO> {
    onError(errorObject: EO) : void;
    onSuccess(successObject: SO) : void;
}