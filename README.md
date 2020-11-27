# Interval

An Interval class for JavaScript

## Full documentation:
* [Interval](https://github.com/cdellacqua/interval/blob/master/docs/classes/interval.md)

## Highlights

###
Always serializes to S, M:SS, H:MM:SS, D:HH:MM:SS based on what is needed to fully represent the interval. If the interval
is negative, '-' is prepended to the string representation

```
console.log(new Interval().toString());
// -> 0
console.log(Interval.fromString('12:59:48').toString());
// -> 12:59:48
console.log(Interval.fromString('-2:59:48').toString());
// -> -2:59:48
```

Convenience methods for Date <-> Interval interoperability

```
console.log(Interval.fromDates(new Date(2020, 0, 1, 12, 1, 59), new Date(2020, 1, 1, 12, 1, 59)).toString());
// -> 31:00:00:00
console.log(new Interval(-12, 1, 59).toDate(2020, 0, 1).toString()); // negative Interval => subtracts to given date (ignoring hours, minutes and seconds of the given Date object)
// -> Tue Dec 31 2019 11:58:01 ...
console.log(new Interval(12, 1, 59).toDate(new Date(2020, 0, 1, 3)).toString()); // positive Interval => set to given date (ignoring hours, minutes and seconds of the given Date object)
// -> Wed Jan 01 2020 12:01:59 ...
```
