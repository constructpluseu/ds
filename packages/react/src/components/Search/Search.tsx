import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import type { FieldSize } from "../TextInput";

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  size?: FieldSize;
  onClear?: () => void;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { label = "Pesquisar", size = "md", id, className, value, onClear, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const showClear = Boolean(onClear && value);

  return (
    <div className="cp-search">
      <span className="cp-search__icon" aria-hidden="true" />
      <label htmlFor={inputId} className="cp-visually-hidden">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        type="search"
        role="searchbox"
        placeholder={label}
        value={value}
        className={[
          "cp-input",
          "cp-search__field",
          showClear && "cp-search__field--clearable",
          `cp-input--${size}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          className="cp-search__clear"
          aria-label="Limpar pesquisa"
          onClick={onClear}
        >
          ×
        </button>
      )}
    </div>
  );
});
