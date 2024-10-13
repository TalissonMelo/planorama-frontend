import { Component, OnInit } from '@angular/core';

interface Participant {
  id: string;
  name: string;
}

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  participants: Participant[] = [];
  isMuted: boolean = false;

  ngOnInit(): void {
    this.participants = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' }
    ];
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    console.log(this.isMuted ? 'Microfone Mutado' : 'Microfone Ativado');
    // Lógica futura para mutar o microfone (com Amazon Chime SDK)
  }

  endCall(): void {
    console.log('Chamada encerrada');
  }
}
