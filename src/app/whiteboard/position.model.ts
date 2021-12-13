export interface IPosition {
    x: number;
    y: number;
    height: number;
    width: number;
    xp: number;
    yp: number;
}

export enum EventName {
    CURSOR_MOVE = 'mousemove',
    MOUSE_DOWN = 'mousedown',
    OBJECT_ADDED = 'object:added',
    OBJECT_SELECTED = 'object:selected',
    OBJECT_DESELECTED = 'object:deselected',
    OBJECT_MOVED = 'object:moved',
    OBJECT_SCALED = 'object:scaled',
    OBJECT_ROTATED = 'object:rotated',
    OBJECT_EDITED = 'object:edited',
    OBJECT_REMOVE = 'object:remove',
    OBJECT_DUPLICATED = 'object:duplicated',
    OBJECT_SENT_TO_BACK = 'object:sent-to-back',
    OBJECT_SENT_BACKWARD = 'object:sent-backward',
    OBJECT_SENT_FORWARD = 'object:sent-forward',
    OBJECT_SENT_TO_FRONT = 'object:sent-to-front',
}