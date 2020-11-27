/**
 * Interval class, supports positive and negative intervals (from -23:59:59 to 00:00:00)
 */
export class Interval {
	/**
	 * regex for format (-)D:H:M:S
	 */
	static readonly regex = /^(-?)(\d+:)?(\d+:)?(\d+:)?(\d+)$/;

	_sign: number = 1;
	
	_d: number;
	_h: number;
	_m: number;
	_s: number;

	/** Gets the sign (1 or -1) of the current Interval instance */
	get sign(): number { return this._sign; }
	/** Gets the days of the current Interval instance */
	get d() { return this._d; }
	/** Gets the hours (0-23) of the current Interval instance */
	get h() { return this._h; }
	/** Gets the minutes (0-59) of the current Interval instance */
	get m() { return this._m; }
	/** Gets the seconds (0-59) of the current Interval instance */
	get s() { return this._s; }

	/**
	 * Sets the days (0-23) of the current Interval instance
	 * @param v an integer
	 */
	set d(v: number) {
		this._d = v;
	}

	/**
	 * Sets the hour (0-23) of the current Interval instance
	 * @param v an integer, if it exceeds the valid representation, it will overflow (for example 25 becomes 1)
	 */
	set h(v: number) {
		if (v < 0) {
			this._h = 24 + (v % 24);
		} else {
			this._h = v % 24;
		}
		this.d += Math.floor(v / 24);
	}

	/**
	 * Sets the minutes (0-59) of the current Interval instance
	 * @param v an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)
	 */
	set m(v: number) {
		if (v < 0) {
			this._m = 60 + (v % 60);
		} else {
			this._m = v % 60;
		}
		this.h += Math.floor(v / 60);
	}

	/**
	 * Sets the seconds (0-59) of the current Interval instance
	 * @param v an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)
	 */
	set s(v: number) {
		if (v < 0) {
			this._s = 60 + (v % 60);
		} else {
			this._s = v % 60;
		}
		this.m += Math.floor(v / 60);
	}

	/**
	 * Sets the sign (1 or -1) of the current Interval instance
	 * @param s +1 or -1
	 */
	set sign(s: number) {
		if (s === 1 || s === -1) {
			this._sign = s;
		} else {
			throw new Error('sign must be 1 or -1');
		}
	}

	/** Returns an integer representation (including the sign) of the current instance */
	get totalSeconds(): number {
		return this._sign * (this._d * 24 * 60 * 60 + this._h * 60 * 60 + this._m * 60 + this._s);
	}

	/**
	 * Constructs an Interval object
	 * @param sign +1 or -1
	 * @param d days
	 * @param h hours
	 * @param m minutes
	 * @param s seconds
	 */
	constructor(sign: number, d: number, h: number, m: number, s?: number);
	/**
	 * Constructs an Interval object
	 * @param s integer representation of an Interval (new Interval(s).totalSeconds === s)
	 */
	constructor(s?: number);
	/**
	 * Constructs an Interval object
	 * @param str a string representation of an Interval (-)D:HH:MM:SS
	 */
	constructor(str: string);
	constructor(secondsOrSignOrDate?: number|string, d?: number, h?: number, m?: number, s?: number) {
		if (secondsOrSignOrDate === undefined || secondsOrSignOrDate === null) {
			this._d = 0;
			this._h = 0;
			this._m = 0;
			this._s = 0;
		} else if (typeof secondsOrSignOrDate === 'string') {
			const matches = secondsOrSignOrDate.match(Interval.regex);

			if (!matches) {
				throw new Error(`invalid interval format ${secondsOrSignOrDate}`);
			}

			const values = matches.slice(2).filter(Boolean).map((v) => Number(v.indexOf(':') !== -1 ? v.slice(0, -1) : v));

			this.sign = matches[1] === '-' ? -1 : 1,
			this._d = 0;
			this._h = 0;
			this._m = 0;
			this._s = 0;
			this.s += Number(values[values.length - 1]);
			this.m += Number(values[values.length - 2] || 0);
			this.h += Number(values[values.length - 3] || 0);
			this.d += Number(values[values.length - 4] || 0);
		} else if (h === undefined) {
			this._sign = secondsOrSignOrDate >= 0 ? 1 : -1;
			this._d = 0;
			this._h = 0;
			this._m = 0;
			this._s = 0;
			this.s += this.sign * secondsOrSignOrDate;
		} else {
			this._sign = secondsOrSignOrDate >= 0 ? 1 : -1;
			this._d = 0;
			this._h = 0;
			this._m = 0;
			this._s = 0;
			this.s += s ?? 0;
			this.m += m!;
			this.h += h!;
			this.d += d!;
		}
	}

	/**
	 * Creates a clone of the current instance
	 */
	clone(): Interval {
		return new Interval(this._sign, this._d, this._h, this._m, this._s);
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
	static fromDate(from: Date, to: Date): Interval {
		return new Interval(
			Math.round(
				(to.getTime() - from.getTime()) / 1000
			)
		);
	}

	/**
	 * Returns a Date object with the interval of day set according to this instance
	 * @param year year
	 * @param month month
	 * @param date date
	 */
	toDate(year: number, month: number, date: number): Date;
	/**
	 * Returns a new Date object with the interval of day set according to this instance
	 * @param date the reference Date the year, month and date will be extracted from
	 */
	toDate(date: Date): Date;
	/**
	 * Returns a new Date object with the interval of day set according to this instance
	 */
	toDate(): Date;

	toDate(dateOrYear?: number|Date, month?: number, date?: number): Date {
		if (!dateOrYear) {
			return this.toDate(new Date());
		}
		const native = typeof dateOrYear === "number"
			? new Date(dateOrYear, month!, date!)
			: new Date(dateOrYear.getFullYear(), dateOrYear.getMonth(), dateOrYear.getDate());

		native.setTime(native.getTime() + (this.totalSeconds * 1000));
		
		return native;
	}

	/**
	 * Returns true if the sign is 1, false otherwise
	 */
	get isPositive(): boolean {
		return this._sign === 1;
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
	toString(): string {
		const parts = [this._d, this._h, this._m, this._s];
		let index = parts.findIndex((n) => n !== 0);

		const outParts = parts.slice(index);
		let result = '';

		result = [outParts[0].toString(), outParts.slice(1).map((n) => n.toString().padStart(2, '0')).join(':')].filter(Boolean).join(':');
		
		if (result !== '0') {
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
	toLocaleString(locales?: string[]|string, options?: Intl.DateTimeFormatOptions): string {
		return this.toDate().toLocaleDateString(locales, options);
	}

	/**
	 * Checks whether two intervals are equal
	 * @param t1 first Interval or string
	 * @param t2 second Interval or string
	 */
	static equals(t1: Interval|string, t2: Interval|string) {
		if (typeof t1 === 'string') {
			t1 = Interval.fromString(t1);
		}
		return t1.equals(t2);
	}
	/**
	 * Checks whether this instance is equal to another interval
	 * @param that the other instance or string
	 */
	equals(that: Interval|string): boolean {
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
	static compare(t1: Interval|string, t2: Interval|string) {
		if (typeof t1 === 'string') {
			t1 = Interval.fromString(t1);
		}
		return t1.compare(t2);
	}
	/**
	 * Compares this instance to another interval
	 * @param that the other interval instance or string
	 */
	compare(that: Interval|string): number {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}

		return this.totalSeconds - that.totalSeconds;
	}

	/**
	 * Adds an Interval to the current instance, returning a new Interval
	 * @param that the other Interval or string
	 */
	add(that: Interval|string): Interval {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}
		return new Interval(this.totalSeconds + that.totalSeconds);
	}

	/**
	 * Subtracts an Interval to the current instance, returning a new Interval
	 * @param that the other Interval or string
	 */
	sub(that: Interval|string): Interval {
		if (typeof that === 'string') {
			that = Interval.fromString(that);
		}
		return new Interval(this.totalSeconds - that.totalSeconds);
	}
}
