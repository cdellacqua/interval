/**
 * Interval class, supports positive and negative intervals
 */
export class Interval {
	/**
	 * regex for format (-)DdH:M:S
	 */
	static readonly regex = /^(-?)(\d+d)?(\d+:)?(\d+:)?(\d+)?$/;

	_totalSeconds = 0;

	/** Gets the sign (1 or -1) of the current Interval instance */
	get sign(): number { return this._totalSeconds >= 0 ? 1 : -1; }
	/** Gets the seconds (0-59) of the current Interval instance */
	get s() {
		return Math.abs(this._totalSeconds) % 60;
	}
	/** Gets the minutes (0-59) of the current Interval instance */
	get m() {
		return Math.floor((Math.abs(this._totalSeconds) - (this.d * 24 * 60 * 60) - (this.h * 60 * 60)) / 60)
	}
	/** Gets the hours (0-23) of the current Interval instance */
	get h() {
		return Math.floor((Math.abs(this._totalSeconds) - (this.d * 24 * 60 * 60)) / (60 * 60));
	}
	/** Gets the days of the current Interval instance */
	get d() {
		return Math.floor(Math.abs(this._totalSeconds) / (24 * 60 * 60));
	}


	/**
	 * Sets the sign (1 or -1) of the current Interval instance
	 * @param s +1 or -1
	 */
	set sign(s: number) {
		if ((s === 1 || s === -1) && this.sign !== s) {
			this._totalSeconds *= -1;
		} else {
			throw new Error('sign must be 1 or -1');
		}
	}

	/** Returns an integer representation of the days of the current instance */
	get totalDays(): number {
		return Math.round(this._totalSeconds / 60 / 60 / 24);
	}

	/** Returns an integer representation of the hours of the current instance */
	get totalHours(): number {
		return Math.round(this._totalSeconds / 60 / 60);
	}

	/** Returns an integer representation of the minutes of the current instance */
	get totalMinutes(): number {
		return Math.round(this._totalSeconds / 60);
	}

	/** Returns an integer representation (including the sign) of the current instance */
	get totalSeconds(): number {
		return this._totalSeconds;
	}

	/**
	 * Constructs an Interval object
	 * @param sign +1 or -1
	 * @param d days
	 * @param h hours
	 * @param m minutes
	 * @param s seconds
	 */
	constructor(sign: number, d: number, h?: number, m?: number, s?: number);
	/**
	 * Constructs an Interval object
	 * @param s integer representation of an Interval (new Interval(s).totalSeconds === s)
	 */
	constructor(s?: number);
	/**
	 * Constructs an Interval object
	 * @param str a string representation of an Interval (-)DdHH:MM:SS
	 */
	constructor(str: string);
	constructor(secondsOrSignOrDate?: number | string, d?: number, h?: number, m?: number, s?: number) {
		if (secondsOrSignOrDate === undefined || secondsOrSignOrDate === null) {
			this._totalSeconds = 0;
		} else if (typeof secondsOrSignOrDate === 'string') {
			const matches = secondsOrSignOrDate.match(Interval.regex);
			
			if (!matches || secondsOrSignOrDate === '' || secondsOrSignOrDate === '-') {
				throw new Error(`invalid interval format ${secondsOrSignOrDate}`);
			}

			const sign = matches[1] === '-' ? -1 : 1;
			const timeValues = matches.slice(3).filter(Boolean).map((v) => Number(v.slice(-1) === ':' ? v.slice(0, -1) : v));
			this._totalSeconds = sign * (Number(timeValues[timeValues.length - 1] || 0)
				+ Number(timeValues[timeValues.length - 2] || 0) * 60
				+ Number(timeValues[timeValues.length - 3] || 0) * 60 * 60
				+ Number((matches[2] && matches[2].slice(0, -1)) || 0) * 60 * 60 * 24);
			
		} else if (d === undefined) {
			this._totalSeconds = secondsOrSignOrDate;
		} else {
			this._totalSeconds = secondsOrSignOrDate * (Number(s || 0)
				+ Number(m || 0) * 60
				+ Number(h || 0) * 60 * 60
				+ Number(d) * 60 * 60 * 24);
		}
	}

	/**
	 * Creates a clone of the current instance
	 */
	clone(): Interval {
		return new Interval(this._totalSeconds);
	}

	/**
	 * Creates an Interval corresponding to 0
	 */
	static zero(): Interval {
		return new Interval(0);
	}

	/**
	 * Returns an Interval object from a string
	 * @param str a string representation of an Interval
	 */
	static fromString(str: string): Interval {
		return new Interval(str);
	}

	/**
	 * Returns an Interval object
	 * @param from starting date of the interval
	 * @param to ending date of the interval
	 */
	static fromDates(from: Date, to: Date): Interval {
		return new Interval(
			Math.round(
				(to.getTime() - from.getTime()) / 1000
			)
		);
	}

	/**
	 * Returns a Date object, its time is set to the reference Date plus the interval instance value
	 * @param year year
	 * @param month month
	 * @param date date
	 * @param h hour
	 * @param m minute
	 * @param s second
	 */
	toDate(year: number, month: number, date?: number, h?: number, m?: number, s?: number): Date;
	/**
	 * Returns a new Date object, its time is set to the reference Date plus the interval instance value
	 * @param date the reference Date the year, month and date will be extracted from
	 */
	toDate(date: Date): Date;
	/**
	 * Returns a new Date object, its time is set to now plus the interval instance value
	 */
	toDate(): Date;

	toDate(dateOrYear?: number | Date, month?: number, date?: number, h?: number, m?: number, s?: number): Date {
		if (!dateOrYear) {
			return this.toDate(new Date());
		}

		let stopParams = false;
		const native = typeof dateOrYear === "number"
			? new (Date as any)(
				...([dateOrYear, month!, date, h, m, s]
					.reduce((acc: number[], v?: number) => {
						if (stopParams || (v === undefined || v === null)) {
							stopParams = true;
							return acc;
						}
						return [...acc, v];
					},
						[] as number[],
					)))
			: new Date(dateOrYear.getTime());

		native.setTime(native.getTime() + (this.totalSeconds * 1000));

		return native;
	}

	/**
	 * Returns true if the sign is 1, false otherwise
	 */
	get isPositive(): boolean {
		return this.sign === 1;
	}

	/**
	 * Returns true if the sign is -1, false otherwise
	 */
	get isNegative(): boolean {
		return !this.isPositive;
	}

	/**
	 * Returns a string representation for the current instance
	 */
	toString(full?: boolean): string {
		const parts = [this.d, this.h, this.m, this.s];
		let index = full ? 0 : parts.findIndex((n) => n !== 0);

		const outParts = parts.slice(index);
		let result = '';

		result = [outParts[0].toString(), outParts.slice(1).map((n) => n.toString().padStart(2, '0')).join(':')]
			.filter(Boolean)
			.join(outParts.length > 3 ? 'd' : ':');

		if (result !== '0' && result !== '0d00:00:00') {
			result = (this.isNegative ? '-' : '') + result;
		}

		return result;
	}

	/**
	 * Returns a string representation for the current instance
	 */
	toJSON(): string {
		return this.toString();
	}

	/**
	 * Returns a string representing the current interval using the native toLocaleIntervalString of the Date type.
	 * Warning: if the interval is negative, the locale string will represent a positive time because of the undeflow
	 * behaviour of the conversion to a Date object
	 * @param locales an array of locales or a specific locale
	 * @param options the Intl.DateTimeFormatOptions object
	 */
	toLocaleString(locales?: string[] | string, options?: Intl.DateTimeFormatOptions): string {
		return this.toDate().toLocaleDateString(locales, options);
	}

	/**
	 * Checks whether two intervals are equal
	 * @param t1 first Interval or string
	 * @param t2 second Interval or string
	 */
	static equals(t1: Interval | string, t2: Interval | string) {
		if (typeof t1 === 'string') {
			t1 = Interval.fromString(t1);
		}
		return t1.equals(t2);
	}
	/**
	 * Checks whether this instance is equal to another interval
	 * @param that the other instance or string
	 */
	equals(that: Interval | string): boolean {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}
		return this.toString() === that.toString();
	}

	/**
	 * Compares two intervals
	 * @param t1 first operand
	 * @param t2 second operand
	 */
	static compare(t1: Interval | string, t2: Interval | string) {
		if (typeof t1 === 'string') {
			t1 = Interval.fromString(t1);
		}
		return t1.compare(t2);
	}
	/**
	 * Compares this instance to another interval
	 * @param that the other interval instance or string
	 */
	compare(that: Interval | string): number {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}

		return this.totalSeconds - that.totalSeconds;
	}

	/**
	 * Adds an Interval to the current instance, returning a new Interval
	 * @param that the other Interval or string
	 */
	add(that: Interval | string): Interval {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}
		return new Interval(this.totalSeconds + that.totalSeconds);
	}

	/**
	 * Subtracts an Interval to the current instance, returning a new Interval
	 * @param that the other Interval or string
	 */
	sub(that: Interval | string): Interval {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}
		return new Interval(this.totalSeconds - that.totalSeconds);
	}
}
