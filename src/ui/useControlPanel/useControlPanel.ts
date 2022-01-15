import './styles.css';
import { createNestedElements } from '../html';
import {
  IControlPanelProps,
  IRotationButtonPanelProps,
  IMirrorButtonPanelProps,
  IStretchButtonPanelProps,
  IMoveButtonsPanelProps,
  IRotateClockButtonsProps
} from './types';
// @ts-ignore
import rotateZArrow from './rotate-icon.svg';
import {TInputEvent} from "../html/types";

export function useControlPanel({
  handleTurnLeft, handleTurnRight, handleTurnDown, handleTurnUp, toggleAutoMode,
  handleMirrorX, handleMirrorY, handleMirrorZ,
  handleStretchOutX, handleStretchOutY, handleStretchOutZ,
  handleStretchInX, handleStretchInY, handleStretchInZ,
  handleMoveRight, handleMoveUp, handleMoveLeft, handleMoveDown,
  handleTurnClock, handleTurnReverseClock
}: IControlPanelProps) {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('No root container in DOM');
  }

  const panelContainer = createNestedElements({
    tagName: 'div',
    className: 'control-panel__container',
    children: [
      {
        tagName: 'h1',
        className: 'title',
        children: 'rotation'
      },
      rotationInput('X', (event) => { console.log(event.target.value )}),
      rotationInput('Y', (event) => { console.log(event.target.value )}),
      rotationInput('Z', (event) => { console.log(event.target.value )}),
      getRotateOverZButtons({ handleTurnClock, handleTurnReverseClock }),
      getRotationButtonsPanel({
        handleTurnLeft,
        handleTurnRight,
        handleTurnDown,
        handleTurnUp,
      }),
      getCheckbox({
        label: 'auto mode',
        handle: toggleAutoMode
      }),
      getBorder(),
      {
        tagName: 'h1',
        className: 'title',
        children: 'move'
      },
      getMovePanel({
        handleMoveRight,
        handleMoveUp,
        handleMoveLeft,
        handleMoveDown
      }),
      getBorder(),
      {
        tagName: 'h1',
        className: 'title',
        children: 'mirror',
      },
      getMirrorButtonsPanel({ handleMirrorX, handleMirrorY, handleMirrorZ }),
      getBorder(),
      getStretchButtonsPanel({
        handleStretchOutX,
        handleStretchOutY,
        handleStretchOutZ,
        handleStretchInX,
        handleStretchInY,
        handleStretchInZ
      })
    ]
  })
  root.append(panelContainer);
}

function getMovePanel({
  handleMoveDown,
  handleMoveLeft,
  handleMoveRight,
  handleMoveUp,
}: IMoveButtonsPanelProps) {
  return getRotationButtonsPanel({
    handleTurnDown: handleMoveDown,
    handleTurnLeft: handleMoveLeft,
    handleTurnUp: handleMoveUp,
    handleTurnRight: handleMoveRight
  })
}

function getStretchButtonsPanel({
  handleStretchOutX, handleStretchOutY, handleStretchOutZ,
  handleStretchInX, handleStretchInY, handleStretchInZ
}: IStretchButtonPanelProps) {
  return {
    tagName: 'div',
    className: 'control-panel__inner-buttons-panel__turn-buttons-container__column',
    children: [
      {
        tagName: 'h1',
        className: 'title',
        children: 'stretch-in',
      },
      {
        tagName: 'div',
        className: 'control-panel__inner-buttons-panel__turn-buttons-container__row',
        children: [
          {
            tagName: 'button',
            onClick: handleStretchInX,
            children: 'x'
          },
          {
            tagName: 'button',
            onClick: handleStretchInY,
            children: 'y'
          },
          {
            tagName: 'button',
            onClick: handleStretchInZ,
            children: 'z'
          },
        ]
      },
      {
        tagName: 'h1',
        className: 'title',
        children: 'stretch-out',
      },
      {
        tagName: 'div',
        className: 'control-panel__inner-buttons-panel__turn-buttons-container__row',
        children: [
          {
            tagName: 'button',
            onClick: handleStretchOutX,
            children: 'x'
          },
          {
            tagName: 'button',
            onClick: handleStretchOutY,
            children: 'y'
          },
          {
            tagName: 'button',
            onClick: handleStretchOutZ,
            children: 'z'
          },
        ]
      }
    ]
  };
}

function getMirrorButtonsPanel({ handleMirrorX, handleMirrorY, handleMirrorZ }: IMirrorButtonPanelProps) {
  return {
    tagName: 'div',
    className: 'control-panel__inner-buttons-panel__turn-buttons-container__row',
    children: [
      {
        tagName: 'button',
        onClick: handleMirrorX,
        children: 'x'
      },
      {
        tagName: 'button',
        onClick: handleMirrorY,
        children: 'y'
      },
      {
        tagName: 'button',
        onClick: handleMirrorZ,
        children: 'z'
      },
    ]
  }
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
      className: 'control-panel__inner-buttons-panel__turn-buttons-container__row',
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
    className: 'control-panel__inner-buttons-panel__turn-buttons-container',
    children: buttons
  }
}

function getRotateOverZButtons({ handleTurnClock, handleTurnReverseClock}: IRotateClockButtonsProps) {
  const buttonLeft = {
    tagName: 'button',
    className: 'control-panel__z-button-left',
    props: [
      { name: 'style',
        value: `background-image: url(${rotateZArrow});`}
    ],
    onClick: handleTurnClock
  };

  const buttonRight = {
    tagName: 'button',
    className: 'control-panel__z-button-right',
    props: [
      { name: 'style',
        value: `background-image: url(${rotateZArrow});`}
    ],
    onClick: handleTurnReverseClock
  }

  return {
    tagName: 'div',
    className: 'control-panel__z-buttons-container',
    children: [
      buttonLeft,
      buttonRight
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

function getBorder() {
  return {
    tagName: 'div',
    className: 'border',
  };
}

function rotationInput(label: string, handle: (event: TInputEvent) => void) {
  return {
    tagName: 'label',
    className: 'control-panel__input-container',
    children: [
      {
        tagName: 'span',
        children: label
      },
      {
        tagName: 'input',
        props: [
          { name: 'type', value: 'number'}
        ],
        className: 'control-panel__input',
        onChange: handle
      }
    ]
  }
}
