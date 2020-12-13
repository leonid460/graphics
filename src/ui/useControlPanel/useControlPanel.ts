import './styles.css';
import { createNestedElements } from '../html';
import { IControlPanelProps, IRotationButtonPanelProps } from './types';

export function useControlPanel({handleTurnLeft, handleTurnRight, handleTurnDown, handleTurnUp, toggleAutoMode}: IControlPanelProps) {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('No root container in DOM');
  }

  const panelContainer = createNestedElements({
    tagName: 'div',
    className: 'control-panel__container',
    children: [
      getRotationButtonsPanel({
        handleTurnLeft,
        handleTurnRight,
        handleTurnDown,
        handleTurnUp
      }),
      getCheckbox({
        label: 'auto mode',
        handle: toggleAutoMode
      })
    ]
  })

  root.append(panelContainer);
}

function getRotationButtonsPanel({handleTurnLeft, handleTurnRight, handleTurnDown, handleTurnUp}: IRotationButtonPanelProps) {
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
  ];

  return {
    tagName: 'div',
    className: 'control-panel__inner-buttons-panel',
    children: [
      {
        tagName: 'div',
        className: 'control-panel__inner-buttons-panel__turn-buttons-container',
        children: buttons
      }
    ]
  }
}

function getCheckbox({ label, handle }: { label: string; handle: () => void }) {
  return {
    tagName: 'label',
    className: 'control-panel__checkbox-container',
    children: [
      {
        tagName: 'input',
        props: [
          { name: 'type', value: 'checkbox'}
        ],
        className: 'control-panel__checkbox',
        onClick: handle
      },
      {
        tagName: 'span',
        children: label
      }
    ]
  }
}
