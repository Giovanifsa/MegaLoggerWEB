import DTO from "./dto/DTO";
import IResourceCallback from "./IResourceCallback";

export default class RestResource {
    protected POST(url: string, payload: DTO, callback: IResourceCallback<any, any>) : void {
        let requestInit = this.createRequestInit("POST", payload);
        
        let request = new Request(url, requestInit);

        fetch(request)
            .then((response: Response) => {
                return response.json().then((data) => ( {
                    data: data,
                    status: response.status
                }));
            })
            .then((resolved) => {
                if (resolved.status === 200) {
                    callback.onSuccess(resolved.data);
                }

                else {
                    callback.onError(resolved.data);
                }
            })
            .catch((error: TypeError) => {
                console.log(error.message);
            });
    }

    protected getDefaultHeaders() : Headers {
        let headers: HeadersInit = new Headers();

        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Teste");

        return headers;
    }

    protected createRequestInit(method: string, payload: DTO) : RequestInit {
        return {
            method,
            headers: this.getDefaultHeaders(),
            cache: "default",
            body: payload?.convertToJSON()
        };
    }

    protected getBaseURL() : string {
        return "http://localhost:8080/MegaLoggerEE/api";
    }
}