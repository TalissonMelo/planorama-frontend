import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallComponent } from './video-call.component';
import { VideoCallRoutingModule } from './video-call-routing.module';



@NgModule({
  declarations: [
    VideoCallComponent,
  ],
  imports: [
    CommonModule,
    VideoCallRoutingModule
  ],
  exports: [VideoCallComponent],
})
export class VideoCallModule { }
