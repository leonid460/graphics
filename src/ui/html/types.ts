export interface INestedElementParams {
  tagName: string;
  className?: string;
  props?: ElementProp[];
  onClick?: () => void;
  children?: INestedElementParams[] | string;
}

type ElementProp = { name: string; value: string }
