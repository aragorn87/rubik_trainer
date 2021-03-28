const movesconstraints = [
    {
        move:'D',
        isLeftClawOpenBeforeMoving: false,
        isrightClawOpenBeforeMoving: false,
        limb: 'rightWrist',
        direction: 1,
        isAtomic: true
    },
    {
        move:'L',
        isLeftClawOpenBeforeMoving: false,
        isrightClawOpenBeforeMoving: false,
        limb: 'leftWrist',
        direction: 1,
        isAtomic: true
    },
    {
        move:'X',
        isLeftClawOpenBeforeMoving: false,
        isrightClawOpenBeforeMoving: true,
        limb: 'leftWrist',
        direction: -1,
        isAtomic: true
    },
    {
        move:'Y',
        isLeftClawOpenBeforeMoving: true,
        isrightClawOpenBeforeMoving: false,
        limb: 'rightWrist',
        direction: -1,
        isAtomic: true
    },
    {
        move:'U',
        isAtomic: false,
        subMoves: ["X", "X", "D"]
    },
];

export default movesconstraints;