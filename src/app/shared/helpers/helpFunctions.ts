import {Observable} from "rxjs/Observable";
export class HelpFunctions {

  static getMockHttp(methods): any {
    const mockHttp = jasmine.createSpyObj('mockHttp', Object.keys(methods));

    if ('get' in methods) {
      mockHttp.get.and.returnValue(Observable.of(methods.get));
    }
    if ('post' in methods) {
      mockHttp.post.and.returnValue(Observable.of(methods.post));
    }
    if ('patch' in methods) {
      mockHttp.patch.and.returnValue(Observable.of(methods.patch));
    }
    if ('put' in methods) {
      mockHttp.put.and.returnValue(Observable.of(methods.put));
    }
    if ('delete' in methods) {
      mockHttp.delete.and.returnValue(Observable.of(methods.delete));
    }

    return mockHttp;
  }

}
