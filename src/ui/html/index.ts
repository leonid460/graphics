import { INestedElementParams } from './types';

export function createNestedElements(elementParams: INestedElementParams) {
  const { tagName, className, children} = elementParams;
  const element = createDomElementWithClass(tagName, className);

  if (children) {
    if (typeof children === 'string') {
      element.innerText = children;
    } else {
      children.forEach(nestedParams => {
        const nestedElement = createNestedElements(nestedParams);
        nestedElement.onclick = nestedParams.onClick || null;
        element.append(nestedElement);
      })
    }
  }

  return element;
}

function createDomElementWithClass(tagName: string, className?: string) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  return element;
}
