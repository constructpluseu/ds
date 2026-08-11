import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpLoadingSpinnerSize = "sm" | "md" | "lg";

@Component({
  selector: "cp-loading-spinner",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="wrapperClasses" role="status" [attr.aria-label]="label"></span>`,
})
export class CpLoadingSpinnerComponent {
  @Input() size: CpLoadingSpinnerSize = "md";
  @Input() label = "A carregar…";

  get wrapperClasses(): string {
    return ["cp-spinner", `cp-spinner--${this.size}`].join(" ");
  }
}
