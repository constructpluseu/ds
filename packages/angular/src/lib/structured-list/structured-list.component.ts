import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cp-structured-list",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="cp-structured-list" [attr.aria-label]="ariaLabel">
      <thead>
        <tr>
          <th *ngFor="let header of headers" scope="col">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of rows">
          <td *ngFor="let cell of row">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class CpStructuredListComponent {
  @Input() headers: string[] = [];
  @Input() rows: (string | number)[][] = [];
  @Input() ariaLabel = "";
}
