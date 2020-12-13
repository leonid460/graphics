export interface INestedElementParams {
  tagName: string;
  className?: string;
  onClick?: () => void;
  children?: INestedElementParams[] | string;
}
