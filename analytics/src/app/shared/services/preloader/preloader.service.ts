import {Injectable} from '@angular/core';
declare var $: any;

@Injectable()
export class PreloaderService {

  private static _loaders:Array<Promise<any>> = [];

  public static registerLoader(method:Promise<any>):void {
    PreloaderService._loaders.push(method);
  }

  public static clear():void {
    PreloaderService._loaders = [];
  }

  public static load():Promise<any> {
    return new Promise((resolve, reject) => {
      PreloaderService._executeAll(resolve);
    });
  }

  private static _executeAll(done:Function):void {
    setTimeout(() => {
      Promise.all(PreloaderService._loaders).then((values) => {
        done.call(null, values);
      }).catch((error) => {
        console.error(error);
      });
    });
  }
}
