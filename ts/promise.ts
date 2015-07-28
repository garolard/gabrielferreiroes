interface IPromise<T> {
	then(onFullfilled: (value: T) => any, onRejected: (reason: Error) => any): IPromise<T>;
}

class MPromise<T> implements IPromise<T> {

    private PENDING: number = 0;
    private FULLFILLED: number = 1;
    private REJECTED: number = 2;
    public state: number;

    public value: any;
    public reason: Error;

    private callbacksValid: Function[];
    private callbacksRejected: Function[];

    constructor() {
        this.state = this.PENDING;
        this.callbacksRejected = [];
        this.callbacksValid = [];
    }
	
    then(onFullfilled?: (value: T) => any, onRejected?: (reason: Error) => any): IPromise<T> {
		
        var p: MPromise<T> = new MPromise<T>();
        
		// Chanined promises mechanisim
		if (!(onFullfilled instanceof Function)) {
			onFullfilled = (x) => { return x };
		}

		this.manageCallback(p, onFullfilled, this.FULLFILLED);

		if (!(onRejected instanceof Function)) {
			onRejected = (r) => { return r };
		}
		this.manageCallback(p, onRejected, this.REJECTED);
		
		return p;
    }
	
	private manageCallback(p: MPromise<T>, callback: Function, state: number): void {
		
		if (this.state == state) {
			this.applyCallback(p, callback);
		} else { // Pending state
			var wrapper: Function = () => {
				this.applyCallback(p, callback);
			};
			
			if (state == this.FULLFILLED) {
				this.callbacksValid.push(wrapper);
			} else {
				this.callbacksRejected.push(wrapper);
			}
		}
		
	}
	
	private applyCallback(p: MPromise<T>, callback: Function): void {
		try {
		
			var callbackValue: any = callback.call(null, this.value);
		
			if (callbackValue instanceof MPromise) {
				callbackValue.then(p.validate, p.reject);
			}
		
		} catch (e) {
			p.reject(new TypeError);
		}
	}
	
	private changeState(state: number, callbacks: Function[], value: any): void {
		if (this.state == this.PENDING) {
			this.state = state;
			this.value = value;

			while (callbacks.length != 0) {
				var f: Function = callbacks.shift();
				f.call(this, value);
			}
		}
	}

	public validate(x: any): void {
		this.changeState(this.FULLFILLED, this.callbacksValid, x);
	}

	public reject(reason: Error): void {
		this.changeState(this.REJECTED, this.callbacksRejected, reason);
	}
	
}

// Usage:
// Return a new MPromise instance wherever your API
// make some async work.
// If the work finished correctly call the validate() MPromise
// method with a value if there is one.
// If the work fails call the reject() MPromise with an Error
// object as parameter.