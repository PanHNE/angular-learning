import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  onAddServer(serveNameInpuit: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serveNameInpuit.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serveNameInpuit: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serveNameInpuit.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
