import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {

  private rxStomp: RxStomp;
  
  constructor(){
    this.initWebSocket();
  }

  ngOnDestroy(): void {
    this.rxStomp.deactivate();
  }

  subscribeToWebSocket(destination: string): Observable<any>{
    return this.rxStomp.watch(destination).pipe(
      map(response  => JSON.stringify(response.body))
    );
  }

  publishToWebSocket(destination: string, body: any): void{
    this.rxStomp.publish({destination: destination, body: JSON.stringify(body)});
  }

  private initWebSocket(): void{
    this.rxStomp = new RxStomp();

    this.rxStomp.configure({
      brokerURL: "ws://localhost:8080/websocket-chat"
    })
    
    this.rxStomp.activate();
  }

}
