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
        var incremental;
        if(newPulse<this.minPulse | newPulse>this.maxPulse) {
            return 0;
        } else {
            while (this.currentPos!=newPulse) {
                if (newPulse>this.currentPos) {
                    incremental = 5;
                } else {
                    incremental = -5;
                }
                this.pcaHandler.setPulseLength(this.id, this.currentPos+incremental);
                this.currentPos = this.currentPos + incremental;
            setTimeout(() => {this.setPulse(newPulse)}, 50);
            }
            return 1;
        }
    }

    Home() {
        this.pcaHandler.setPulseLength(this.id, this.startPos);
        // await new Promise(r => setTimeout(r, 2000));
    }
};