export default class Servo {
    constructor(channelId, name, minPulse, maxPulse, startPos, pcaHandler) {
        this.id=channelId;
        this.name=name;
        this.min=minPulse;
        this.max=maxPulse;
        this.pcaHandler = pcaHandler;
        this.startPos=startPos;
        this.currentPos=startPos;
        this.pcaHandler.setPulseLength(this.id, startPos);
    }

    setPulse(newPulse) {
        return new Promise(resolve => {
            var incremental;
            if(newPulse<=this.minPulse | newPulse>=this.maxPulse) {
                resolve();
            } else {
                if (newPulse===this.currentPos) {
                    setTimeout(resolve, 400);
                } else {
                    if (newPulse>this.currentPos) {
                        incremental = 5;
                    } else {
                        incremental = -5;
                    };
                    this.currentPos = this.currentPos + incremental;
                    this.pcaHandler.setPulseLength(this.id, this.currentPos, 0, () => {
                        // console.log(this.name+": SUCCESS: "+Date.now());
                        // console.log(this.currentPos, newPulse);
                        resolve(this.setPulse(newPulse));
                    });
                    };
                };
            });
        };


    Home() {
        console.log("Homing " + this.name);
        // this.pcaHandler.setPulseLength(this.id, this.startPos);
        return this.setPulse(this.startPos);

    }
};