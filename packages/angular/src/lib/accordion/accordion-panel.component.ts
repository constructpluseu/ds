import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-accordion-panel",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="open"
      role="region"
      [id]="panelId"
      [attr.aria-labelledby]="headerId"
      class="cp-accordion__panel"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CpAccordionPanelComponent {
  @Input() id = "";

  open = false;
  panelId = "";
  headerId = "";

  updateState(open: boolean, headerId: string, panelId: string): void {
    this.open = open;
    this.headerId = headerId;
    this.panelId = panelId;
  }
}
