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
            console.log(newPulse);
            var incremental;
            if(newPulse<=this.minPulse | newPulse>=this.maxPulse) {
                console.log("DONE CANT MOVE");
                resolve();
            } else {
                if (newPulse===this.currentPos) {
                    console.log(this.name+" DONE");
                    setTimeout(this.newMethod(resolve),3000);
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

    newMethod(resolve) {
        return resolve(console.log("Resolved after 3 seconds"));
    }

    Home() {
        console.log("Homing " + this.name);
        // this.pcaHandler.setPulseLength(this.id, this.startPos);
        return this.setPulse(this.startPos);

    }
};