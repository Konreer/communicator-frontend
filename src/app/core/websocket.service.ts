import { Injectable, OnDestroy } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from 'src/app/core/token.service';
import { WSMessage } from '../shared/wsmessage';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {

  constructor(private tokenService: TokenService, private rxStomp: RxStompService){
  }

  ngOnDestroy(): void {
    this.rxStomp.deactivate();
  }

  initWebSocket(): void{
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/websocket-chat',
      reconnectDelay: 200,
      connectHeaders: {
        authorization: `Bearer ${this.tokenService.getTokens().accessToken}`
      }
    });

    this.rxStomp.activate();
  }

  deactivateRxStomp(): void{
    this.rxStomp.deactivate();
  }

  subscribeToWebSocket<T>(destination: string): Observable<T>{
    if (!this.rxStomp.connected()){this.initWebSocket(); }
    return this.rxStomp.watch(destination).pipe(
      map(response  => JSON.parse(response.body))
    );
  }

  publishToWebSocket(destination: string, body: any): void{
    if (!this.rxStomp.connected()){this.initWebSocket(); }
    console.log(JSON.stringify(body));
    const messageToSend: WSMessage = {authToken: `Bearer ${this.tokenService.getTokens().accessToken}`, message: body};
    this.rxStomp.publish({destination, body: JSON.stringify(messageToSend)});
  }

}
