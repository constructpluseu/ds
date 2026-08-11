import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-pagination",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="cp-pagination" [attr.aria-label]="ariaLabel">
      <span class="cp-pagination__status">Página {{ page }} de {{ totalPages }}</span>
      <div class="cp-pagination__nav">
        <button
          type="button"
          class="cp-pagination__button"
          [disabled]="page <= 1"
          aria-label="Página anterior"
          (click)="pageChange.emit(page - 1)"
        >
          ‹
        </button>
        <button
          type="button"
          class="cp-pagination__button"
          [disabled]="page >= totalPages"
          aria-label="Página seguinte"
          (click)="pageChange.emit(page + 1)"
        >
          ›
        </button>
      </div>
    </nav>
  `,
})
export class CpPaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Input() ariaLabel = "Paginação";
  @Output() pageChange = new EventEmitter<number>();
}
