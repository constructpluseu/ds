import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-link",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [href]="href"
      [class]="wrapperClasses"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.target]="external ? '_blank' : null"
      [attr.rel]="external ? 'noopener noreferrer' : null"
    >
      <ng-content></ng-content>
      <span *ngIf="external" class="cp-link__external-icon" aria-hidden="true"></span>
    </a>
  `,
})
export class CpLinkComponent {
  @Input() href = "";
  @Input() muted = false;
  @Input() disabled = false;
  @Input() external = false;

  get wrapperClasses(): string {
    return ["cp-link", this.muted ? "cp-link--muted" : ""].filter(Boolean).join(" ");
  }
}
