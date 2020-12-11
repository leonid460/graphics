interface INestedElementParams {
  tagName: string;
  className?: string;
  children?: INestedElementParams[] | string;
}

export function useControlPanel() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('No root container in DOM');
  }

  const panelContainer = createNestedElements({
    tagName: 'div',
    className: 'control-panel__container',
    children: [{
      tagName: 'div',
      className: 'control-panel__inner-buttons-panel',
      children: [{
        tagName: 'div',
        className: 'control-panel__inner-buttons-panel__turn-buttons-container',
        children: [
          {
            tagName: 'button',
            className: 'control-panel__inner-buttons-panel__turn-button',
            children: 'left'
          },
          {
            tagName: 'button',
            className: 'control-panel__inner-buttons-panel__turn-button',
            children: 'right'
          }
        ]
      }]
    }]
  })

  root.append(panelContainer);
}

function createNestedElements(elementParams: INestedElementParams) {
  const { tagName, className, children} = elementParams;
  const element = createDomElementWithClass(tagName, className);

  if (children) {
    if (typeof children === 'string') {
      element.innerText = children;
    } else {
      children.forEach(nestedParams => {
        const nestedElement = createNestedElements(nestedParams);
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
