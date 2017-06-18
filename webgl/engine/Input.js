/// <reference path="Math.js" />
AxisCode = {
    LeftTrigger: 0,
    RightTrigger: 1,

    LeftStickX: 2,
    LeftStickY: 3,

    RightStickX: 4,
    RightStickY: 5,
}

KeyCode = {
    LeftBumper: 0,
    RightBumper: 1,

    FaceButton1: 2,
    FaceButton2: 3,
    FaceButton3: 4,
    FaceButton4: 5,

    dPadLeft: 6,
    dPadRight: 7,
    dPadUp: 8,
    dPadDown: 9,

    Start: 10,
    Back: 11,

    LeftStick: 12,
    RightStick: 13,

    LeftTrigger: 14,
    RightTrigger: 15,
}

var Input = {

    _getGamepadButtonPressed(index) {
        if (_gamepads[0] == null)
            return false;
        else
            return _gamepads[0].buttons[index].pressed;
    },
    _getGamepadButtonValue(index) {
        if (_gamepads[0] == null)
            return 0.0;
        else
            return _gamepads[0].buttons[index].value;
    },
    _getGamepadAxisValue(index) {
        if (_gamepads[0] == null)
            return 0.0;
        else
            return _gamepads[0].axes[index];
    },

    GetAxis(code) {
        switch (code)
        {
            case AxisCode.LeftTrigger:
                return Input._getGamepadButtonValue(6);
            case AxisCode.RightTrigger:
                return Input._getGamepadButtonValue(7);
            case AxisCode.LeftStickX:
                return Math.moveTowards(Input._getGamepadAxisValue(0), 0, 0.2) * 1.25;
            case AxisCode.LeftStickY:
                return -Math.moveTowards(Input._getGamepadAxisValue(1), 0, 0.2) * 1.25;
            case AxisCode.RightStickX:
                return Math.moveTowards(Input._getGamepadAxisValue(2), 0, 0.2) * 1.25;
            case AxisCode.RightStickY:
                return -Math.moveTowards(Input._getGamepadAxisValue(3), 0, 0.2) * 1.25;
        }
    },
    GetKey(code) {
        switch (code)
        {
            case KeyCode.LeftBumper:
                return Input._getGamepadButtonPressed(4);
            case KeyCode.RightBumper:
                return Input._getGamepadButtonPressed(5);
            case KeyCode.FaceButton1:
                return Input._getGamepadButtonPressed(0);
            case KeyCode.FaceButton2:
                return Input._getGamepadButtonPressed(1);
            case KeyCode.FaceButton3:
                return Input._getGamepadButtonPressed(2);
            case KeyCode.FaceButton4:
                return Input._getGamepadButtonPressed(3);
            case KeyCode.dPadLeft:
                return Input._getGamepadButtonPressed(14);
            case KeyCode.dPadRight:
                return Input._getGamepadButtonPressed(15);
            case KeyCode.dPadUp:
                return Input._getGamepadButtonPressed(12);
            case KeyCode.dPadDown:
                return Input._getGamepadButtonPressed(13);
            case KeyCode.Start:
                return Input._getGamepadButtonPressed(9);
            case KeyCode.Back:
                return Input._getGamepadButtonPressed(8);
            case KeyCode.LeftStick:
                return Input._getGamepadButtonPressed(10);
            case KeyCode.RightStick:
                return Input._getGamepadButtonPressed(11);
            case KeyCode.LeftTrigger:
                return Input._getGamepadButtonPressed(6);
            case KeyCode.RightTrigger:
                return Input._getGamepadButtonPressed(7);
        }
    },
    GetKeyUp(KeyCode)
    {

    },
    GetKeyDown(KeyCode)
    {

    }
}
