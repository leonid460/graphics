export interface IRotationButtonPanelProps {
  handleTurnLeft: () => void;
  handleTurnRight: () => void;
  handleTurnUp: () => void;
  handleTurnDown: () => void;
}

export interface IControlPanelProps extends IRotationButtonPanelProps {
  toggleAutoMode: () => void;
}
