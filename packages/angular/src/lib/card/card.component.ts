import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-card",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses">
      <div *ngIf="title || subtitle" class="cp-card__header">
        <div>
          <h3 *ngIf="title" class="cp-card__title">{{ title }}</h3>
          <p *ngIf="subtitle" class="cp-card__subtitle">{{ subtitle }}</p>
        </div>
        <ng-content select="[cpCardHeaderAction]"></ng-content>
      </div>
      <div class="cp-card__body">
        <ng-content></ng-content>
      </div>
      <div *ngIf="hasFooter" class="cp-card__footer">
        <ng-content select="[cpCardFooter]"></ng-content>
      </div>
    </div>
  `,
})
export class CpCardComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() interactive = false;
  @Input() hasFooter = false;

  get wrapperClasses(): string {
    return ["cp-card", this.interactive ? "cp-card--interactive" : ""].filter(Boolean).join(" ");
  }
}
