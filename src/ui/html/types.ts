export type TInputEvent = Event & {
  target: HTMLInputElement;
}

export interface INestedElementParams {
  tagName: string;
  className?: string;
  props?: ElementProp[];
  onClick?: () => void;
  onChange?: (event: TInputEvent) => void;
  children?: INestedElementParams[] | string;
}

type ElementProp = { name: string; value: string }
