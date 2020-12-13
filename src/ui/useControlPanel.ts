interface INestedElementParams {
  tagName: string;
  className?: string;
  onClick?: () => void;
  children?: INestedElementParams[] | string;
}

interface IControlPanelProps {
  handleTurnLeft: () => void;
  handleTurnRight: () => void;
  handleTurnUp: () => void;
  handleTurnDown: () => void;
}

export function useControlPanel({handleTurnLeft, handleTurnRight, handleTurnDown, handleTurnUp}: IControlPanelProps) {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('No root container in DOM');
  }

  const buttons = [
    {
      tagName: 'button',
      className: 'control-panel__inner-buttons-panel__turn-button__up',
      onClick: handleTurnUp
    },
    {
      tagName: 'div',
      className: 'control-panel__inner-buttons-panel__turn-buttons-container__row ',
      children: [
        {
          tagName: 'button',
          className: 'control-panel__inner-buttons-panel__turn-button__left',
          onClick: handleTurnLeft
        },
        {
          tagName: 'button',
          className: 'control-panel__inner-buttons-panel__turn-button__right',
          onClick: handleTurnRight
        },
      ]
    },
    {
      tagName: 'button',
      className: 'control-panel__inner-buttons-panel__turn-button__down',
      onClick: handleTurnDown
    },
  ]

  const panelContainer = createNestedElements({
    tagName: 'div',
    className: 'control-panel__container',
    children: [{
      tagName: 'div',
      className: 'control-panel__inner-buttons-panel',
      children: [{
        tagName: 'div',
        className: 'control-panel__inner-buttons-panel__turn-buttons-container',
        children: buttons
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
