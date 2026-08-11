import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type CpButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "danger";
export type CpButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "cp-button",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [class]="classes"
      [disabled]="disabled || loading"
      [attr.aria-busy]="loading ? 'true' : null"
    >
      <span *ngIf="loading" class="cp-button__spinner" aria-hidden="true"></span>
      <ng-content *ngIf="!loading" select="[cpLeadingIcon]"></ng-content>
      <span><ng-content></ng-content></span>
      <ng-content *ngIf="!loading" select="[cpTrailingIcon]"></ng-content>
    </button>
  `,
})
export class CpButtonComponent {
  @Input() variant: CpButtonVariant = "primary";
  @Input() size: CpButtonSize = "md";
  /** Mostra um spinner e desativa o botão, mantendo aria-busy para leitores de ecrã. */
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() type: "button" | "submit" | "reset" = "button";

  get classes(): string {
    return [
      "cp-button",
      `cp-button--${this.variant}`,
      `cp-button--${this.size}`,
      this.loading ? "cp-button--loading" : "",
      this.fullWidth ? "cp-button--full-width" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
}
