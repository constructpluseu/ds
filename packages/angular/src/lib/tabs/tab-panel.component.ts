import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-tab-panel",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="active"
      role="tabpanel"
      [id]="panelId"
      [attr.aria-labelledby]="tabId"
      class="cp-tabs__panel"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CpTabPanelComponent {
  @Input() id = "";

  active = false;
  panelId = "";
  tabId = "";

  updateState(active: boolean, tabId: string, panelId: string): void {
    this.active = active;
    this.tabId = tabId;
    this.panelId = panelId;
  }
}
