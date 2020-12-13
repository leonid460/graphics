import './styles.css';
import { createNestedElements } from '../html';
import { IControlPanelProps } from './types';

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
