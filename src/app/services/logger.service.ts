import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {
    onError(errorMessage: string): void {
        console.log('Error has accured : ' + errorMessage);
    }

    onException(ex: Error): void {
        console.log('Exception has accured : ' + ex.name + ' ' + ex.message);
        console.log('Exception Stack trace : ' + ex.stack);
    }

    logInfo(data: string): void {
        console.log('Info : ' + data);
    }

    logObject(data: any): void {
        console.log('Data object logged');
        console.log(data);
    }

    onHttpError(methodName: string, httpResponse: any) {
        console.log('Http Error at method: ' + methodName + ' ' + httpResponse);
        if (httpResponse._body) {
            try {
                const errorJson = JSON.parse(httpResponse._body);
                console.log(errorJson.Message);
            } catch (error) {
                console.log('End of error details');
            }
        }
    }
}
