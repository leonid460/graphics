export interface IRotationButtonPanelProps {
  handleTurnLeft: () => void;
  handleTurnRight: () => void;
  handleTurnUp: () => void;
  handleTurnDown: () => void;
}

export interface IRotateClockButtonsProps {
  handleTurnClock: () => void;
  handleTurnReverseClock: () => void;
}

export interface IMirrorButtonPanelProps {
  handleMirrorX: () => void;
  handleMirrorY: () => void;
  handleMirrorZ: () => void;
}

export interface IStretchButtonPanelProps {
  handleStretchOutX: () => void;
  handleStretchOutY: () => void;
  handleStretchOutZ: () => void;
  handleStretchInX: () => void;
  handleStretchInY: () => void;
  handleStretchInZ: () => void;
}

export interface IMoveButtonsPanelProps {
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleMoveLeft: () => void;
  handleMoveRight: () => void;
}

export interface IControlPanelProps extends
  IRotateClockButtonsProps,
  IRotationButtonPanelProps,
  IMirrorButtonPanelProps,
  IStretchButtonPanelProps,
  IMoveButtonsPanelProps {
  toggleAutoMode: () => void;
}
