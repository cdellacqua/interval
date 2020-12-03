import { Interval } from "../src/index";

beforeAll(() => {
	console.error = jest.fn();
});

describe('constructors', function () {
	it('constructs using the default constructor', () => {
		expect(new Interval().totalSeconds).toEqual(0);
	});
	it('constructs with a specific ms', () => {
		expect(new Interval(1).totalSeconds).toEqual(1);
		expect(new Interval(-1).totalSeconds).toEqual(-1);
	});	
	it('constructs h, m, s', () => {
		expect(new Interval(1, 12, 0, 59).totalSeconds).toEqual(12 * 60 * 60* 24 + 59 * 60);
		expect(new Interval(1, 12, 2, 2).totalSeconds).toEqual(12 * 60 * 60 * 24 + 2 * 60 * 60 + 2 * 60);
	});	
	it('static constructors', () => {
		expect(Interval.zero()).toEqual(new Interval(0));
	});	
});

describe('converts to Interval', function () {
	it('string to Interval', () => {
		expect(Interval.fromString('-12:00:00').toString()).toEqual('-12:00:00');
		expect(Interval.fromString('12:00:00').toString()).toEqual('12:00:00');
		expect(Interval.fromString('10d12:00:00').toString()).toEqual('10d12:00:00');
		expect(Interval.fromString('-10d12:00:00').toString()).toEqual('-10d12:00:00');
		expect(Interval.fromString('-10d').toString()).toEqual('-10d00:00:00');
		expect(Interval.fromString('-10d12').toString()).toEqual('-10d00:00:12');
		expect(Interval.fromString('-10d12:00').toString()).toEqual('-10d00:12:00');
		expect(Interval.fromString('-10d12:00:00').toString()).toEqual('-10d12:00:00');
		expect(Interval.fromString('0').toString()).toEqual('0');
		expect(Interval.fromString('0d').toString()).toEqual('0');
		expect(Interval.fromString('12:00').toString()).toEqual('12:00');
		expect(Interval.fromString('12:01:00').toString()).toEqual('12:01:00');
		expect(Interval.fromString('3d12:01:00').toString()).toEqual('3d12:01:00');
		expect(Interval.fromString('0d12:01:00').toString()).toEqual('12:01:00');
	});
	it('invalid string to DateOnly', () => {
		expect(() => Interval.fromString('12-00:11')).toThrow();
	});
	it('Dates to Interval', () => {
		expect(Interval.fromDates(new Date(2020, 1, 10, 12, 0, 15), new Date(2020, 1, 15, 12, 0, 15)).toString()).toEqual('5d00:00:00');
	});
});

describe('converts to string', function () {
	it('Interval to JSON', () => {
		expect(Interval.fromString('12:00:00').toJSON()).toEqual('12:00:00');
		expect(Interval.fromString('0').toJSON()).toEqual('0');
	});
});


describe('converts to date', function () {
	it('Interval to Date', () => {
		expect(Interval.fromString('12:00:00').toDate(new Date(2020, 0, 1))).toEqual(new Date(2020, 0, 1, 12, 0, 0));
		expect(Interval.fromString('12:00:00').toDate(2020, 0, 1)).toEqual(new Date(2020, 0, 1, 12, 0, 0));
		expect(Interval.fromString('12:00:00').toDate(2020, 0, 1, 11)).toEqual(new Date(2020, 0, 1, 23, 0, 0));
		expect(Interval.fromString('12:00:00').toDate(2020, 0, 1, 11, 12)).toEqual(new Date(2020, 0, 1, 23, 12, 0));
		expect(Interval.fromString('12:00:00').toDate(2020, 0, 1, 11, 12, 4)).toEqual(new Date(2020, 0, 1, 23, 12, 4));
		expect(typeof Interval.fromString('12:00:00').toDate().toISOString() === 'string').toBeTruthy();
		expect(typeof Interval.fromString('12:00:00').toLocaleString() === 'string').toBeTruthy();
	});
});


describe('accessors methods', function () {
	it('access sign, d, h, m, s', () => {
		let t = new Interval(1, 12, 10, 11);
		expect(t.d).toEqual(12);
		expect(t.h).toEqual(10);
		expect(t.m).toEqual(11);
		expect(t.s).toEqual(0);
		expect(t.sign).toEqual(1);

		t = new Interval(-1, 12, 10, 11);
		expect(t.d).toEqual(12);
		expect(t.h).toEqual(10);
		expect(t.m).toEqual(11);
		expect(t.s).toEqual(0);
		expect(t.sign).toEqual(-1);
	});

	it('access totals', () => {
		let t = new Interval(1, 12, 10, 11, 1);
		expect(t.totalDays).toEqual(12);
		expect(t.totalHours).toEqual(298);
		expect(t.totalMinutes).toEqual(17891);
		expect(t.totalSeconds).toEqual(1073461);

		t = new Interval(-1, 12, 10, 11, 0);
		expect(t.totalDays).toEqual(-12);
		expect(t.totalHours).toEqual(-298);
		expect(t.totalMinutes).toEqual(-17891);
		expect(t.totalSeconds).toEqual(-1073460);

		t = new Interval(-1, 12);
		expect(t.totalDays).toEqual(-12);
		expect(t.totalHours).toEqual(-288);
		expect(t.totalMinutes).toEqual(-17280);
		expect(t.totalSeconds).toEqual(-1036800);
	});

	it('changes sign', () => {
		const t = new Interval('20:20:20');
		t.sign = -1;
		expect(t.toString()).toEqual('-20:20:20');
		t.sign = 1;
		expect(t.toString()).toEqual('20:20:20');
		expect(() => t.sign = 0.99999).toThrow();
	});
});

describe('clone', function () {
	it('clones Interval', () => {
		expect(Interval.fromString('12:00:00').clone().toJSON()).toEqual('12:00:00');
	});
});

describe('sum and subtraction of times', () => {
	it('adds 2 times without overflow', () => {
		expect(Interval.fromString('12:00:00').add('01:00:59').toString()).toEqual('13:00:59');
		expect(Interval.fromString('12:00:00').add(Interval.fromString('-01:00:59')).toString()).toEqual('10:59:01');
		expect(Interval.fromString('-12:00:00').add(Interval.fromString('-01:00:59')).toString()).toEqual('-13:00:59');
		expect(Interval.fromString('-12:00:00').add(Interval.fromString('01:00:59')).toString()).toEqual('-10:59:01');
	});
	it('adds 2 times with overflow', () => {
		expect(Interval.fromString('12:00:00').add(Interval.fromString('23:00:59')).toString()).toEqual('1d11:00:59');
		expect(Interval.fromString('12:00:00').add(Interval.fromString('-13:00:59')).toString()).toEqual('-1:00:59');
		expect(Interval.fromString('-12:00:00').add(Interval.fromString('-12:00:59')).toString()).toEqual('-1d00:00:59');
		expect(Interval.fromString('-01:00:00').add(Interval.fromString('01:00:59')).toString()).toEqual('59');
	});
	it('subs 2 times without overflow', () => {
		expect(Interval.fromString('12:00:00').sub('-01:00:59').toString()).toEqual('13:00:59');
		expect(Interval.fromString('12:00:00').sub(Interval.fromString('01:00:59')).toString()).toEqual('10:59:01');
		expect(Interval.fromString('-12:00:00').sub(Interval.fromString('01:00:59')).toString()).toEqual('-13:00:59');
		expect(Interval.fromString('-12:00:00').sub(Interval.fromString('-01:00:59')).toString()).toEqual('-10:59:01');
	});
	it('subs 2 times with overflow', () => {
		expect(Interval.fromString('12:00:00').sub(Interval.fromString('-23:00:59')).toString()).toEqual('1d11:00:59');
		expect(Interval.fromString('12:00:00').sub(Interval.fromString('13:00:59')).toString()).toEqual('-1:00:59');
		expect(Interval.fromString('-12:00:00').sub(Interval.fromString('12:00:59')).toString()).toEqual('-1d00:00:59');
		expect(Interval.fromString('-01:00:00').sub(Interval.fromString('-01:00:59')).toString()).toEqual('59');
	});
});

describe('comparison operators', () => {
	it('compares Interval objects', () => {
		expect(new Interval('20:00:00').compare('21:00:00')).toBeLessThan(0);
		expect(new Interval('21:00:00').compare(new Interval('23:59:59'))).toBeLessThan(0);
		expect(new Interval('21:00:00').compare('00:00:00')).toBeGreaterThan(0);
		expect(new Interval('23:59:59').compare('00:00:00')).toBeGreaterThan(0);
		expect(new Interval('-23:59:59').compare('00:00:00')).toBeLessThan(0);
		expect(new Interval('-23:59:59').compare('-23:59:59')).toBe(0);
		expect(new Interval('-23:59:59').equals(new Interval('-23:59:59'))).toBeTruthy();
		expect(new Interval('-23:59:59').equals('23:59:59')).toBeFalsy();
	});

	it('compares Interval objects using static methods', () => {
		expect(Interval.compare(new Interval('20:00:00'), '21:00:00')).toBeLessThan(0);
		expect(Interval.compare('21:00:00', new Interval('23:59:59'))).toBeLessThan(0);
		expect(Interval.compare(new Interval('21:00:00'), new Interval('00:00:00'))).toBeGreaterThan(0);
		expect(Interval.compare('23:59:59', '00:00:00')).toBeGreaterThan(0);
		expect(Interval.compare('-23:59:59', '00:00:00')).toBeLessThan(0);
		expect(Interval.compare('-23:59:59', '-23:59:59')).toBe(0);
		expect(Interval.equals(new Interval('-23:59:59'), '-23:59:59')).toBeTruthy();
		expect(Interval.equals('-23:59:59', new Interval('-23:59:59'))).toBeTruthy();
		expect(Interval.equals(new Interval('-23:59:59'), new Interval('-23:59:59'))).toBeTruthy();
		expect(Interval.equals('-23:59:59', '-23:59:59')).toBeTruthy();
		expect(Interval.equals('-23:59:59', '23:59:59')).toBeFalsy();
	});
});
