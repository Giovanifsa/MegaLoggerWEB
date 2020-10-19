export default abstract class DTO {
    public convertToJSON() : string {
        return JSON.stringify(this);
    }
};