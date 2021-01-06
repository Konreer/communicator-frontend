import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  connectToWebSocket(): void{

    let rxStomp = new RxStomp();

    rxStomp.configure({
      brokerURL: "ws://localhost:8080/websocket-chat"
    })
    
    rxStomp.activate();


    rxStomp.watch('/user/3/msg').pipe(
      map(response  => JSON.stringify(response.body))
    ).subscribe({
      next: response => console.log('MY SERVICE RESPONSE: ' + response)
    })

    rxStomp.publish({destination: '/app/message', body: JSON.stringify('KONRAD!')})

  }

}
