[@cdellacqua/interval](../README.md) › [Interval](interval.md)

# Class: Interval

Interval class, supports positive and negative intervals

## Hierarchy

* **Interval**

## Index

### Constructors

* [constructor](interval.md#constructor)

### Properties

* [_totalSeconds](interval.md#_totalseconds)
* [regex](interval.md#static-readonly-regex)

### Accessors

* [d](interval.md#d)
* [h](interval.md#h)
* [isNegative](interval.md#isnegative)
* [isPositive](interval.md#ispositive)
* [m](interval.md#m)
* [s](interval.md#s)
* [sign](interval.md#sign)
* [totalDays](interval.md#totaldays)
* [totalHours](interval.md#totalhours)
* [totalMinutes](interval.md#totalminutes)
* [totalSeconds](interval.md#totalseconds)

### Methods

* [add](interval.md#add)
* [clone](interval.md#clone)
* [compare](interval.md#compare)
* [equals](interval.md#equals)
* [sub](interval.md#sub)
* [toDate](interval.md#todate)
* [toJSON](interval.md#tojson)
* [toLocaleString](interval.md#tolocalestring)
* [toString](interval.md#tostring)
* [compare](interval.md#static-compare)
* [equals](interval.md#static-equals)
* [fromDates](interval.md#static-fromdates)
* [fromString](interval.md#static-fromstring)
* [zero](interval.md#static-zero)

## Constructors

###  constructor

\+ **new Interval**(`sign`: number, `d`: number, `h?`: undefined | number, `m?`: undefined | number, `s?`: undefined | number): *[Interval](interval.md)*

Constructs an Interval object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sign` | number | +1 or -1 |
`d` | number | days |
`h?` | undefined &#124; number | hours |
`m?` | undefined &#124; number | minutes |
`s?` | undefined &#124; number | seconds  |

**Returns:** *[Interval](interval.md)*

\+ **new Interval**(`s?`: undefined | number): *[Interval](interval.md)*

Constructs an Interval object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`s?` | undefined &#124; number | seconds  |

**Returns:** *[Interval](interval.md)*

\+ **new Interval**(`str`: string): *[Interval](interval.md)*

Constructs an Interval object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | a string representation of an Interval (-)DdHH:MM:SS  |

**Returns:** *[Interval](interval.md)*

## Properties

###  _totalSeconds

• **_totalSeconds**: *number* = 0

___

### `Static` `Readonly` regex

▪ **regex**: *RegExp‹›* = /^(-?)(\d+d)?(\d+:)?(\d+:)?(\d+)?$/

regex for format (-)DdH:M:S

## Accessors

###  d

• **get d**(): *number*

Gets the days of the current Interval instance

**Returns:** *number*

___

###  h

• **get h**(): *number*

Gets the hours (0-23) of the current Interval instance

**Returns:** *number*

___

###  isNegative

• **get isNegative**(): *boolean*

Returns true if the sign is -1, false otherwise

**Returns:** *boolean*

___

###  isPositive

• **get isPositive**(): *boolean*

Returns true if the sign is 1, false otherwise

**Returns:** *boolean*

___

###  m

• **get m**(): *number*

Gets the minutes (0-59) of the current Interval instance

**Returns:** *number*

___

###  s

• **get s**(): *number*

Gets the seconds (0-59) of the current Interval instance

**Returns:** *number*

___

###  sign

• **get sign**(): *number*

Gets the sign (1 or -1) of the current Interval instance

**Returns:** *number*

• **set sign**(`s`: number): *void*

Sets the sign (1 or -1) of the current Interval instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`s` | number | +1 or -1  |

**Returns:** *void*

___

###  totalDays

• **get totalDays**(): *number*

Returns an integer representation of the days of the current instance

**Returns:** *number*

___

###  totalHours

• **get totalHours**(): *number*

Returns an integer representation of the hours of the current instance

**Returns:** *number*

___

###  totalMinutes

• **get totalMinutes**(): *number*

Returns an integer representation of the minutes of the current instance

**Returns:** *number*

___

###  totalSeconds

• **get totalSeconds**(): *number*

Returns an integer representation (including the sign) of the current instance

**Returns:** *number*

## Methods

###  add

▸ **add**(`that`: [Interval](interval.md) | string): *[Interval](interval.md)*

Adds an Interval to the current instance, returning a new Interval

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Interval](interval.md) &#124; string | the other Interval or string  |

**Returns:** *[Interval](interval.md)*

___

###  clone

▸ **clone**(): *[Interval](interval.md)*

Creates a clone of the current instance

**Returns:** *[Interval](interval.md)*

___

###  compare

▸ **compare**(`that`: [Interval](interval.md) | string): *number*

Compares this instance to another interval

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Interval](interval.md) &#124; string | the other interval instance or string  |

**Returns:** *number*

___

###  equals

▸ **equals**(`that`: [Interval](interval.md) | string): *boolean*

Checks whether this instance is equal to another interval

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Interval](interval.md) &#124; string | the other instance or string  |

**Returns:** *boolean*

___

###  sub

▸ **sub**(`that`: [Interval](interval.md) | string): *[Interval](interval.md)*

Subtracts an Interval to the current instance, returning a new Interval

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Interval](interval.md) &#124; string | the other Interval or string  |

**Returns:** *[Interval](interval.md)*

___

###  toDate

▸ **toDate**(`year`: number, `month`: number, `date?`: undefined | number, `h?`: undefined | number, `m?`: undefined | number, `s?`: undefined | number): *Date*

Returns a Date object, its time is set to the reference Date plus the interval instance value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`year` | number | year |
`month` | number | month |
`date?` | undefined &#124; number | date |
`h?` | undefined &#124; number | hour |
`m?` | undefined &#124; number | minute |
`s?` | undefined &#124; number | second  |

**Returns:** *Date*

▸ **toDate**(`date`: Date): *Date*

Returns a new Date object, its time is set to the reference Date plus the interval instance value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | the reference Date the year, month and date will be extracted from  |

**Returns:** *Date*

▸ **toDate**(): *Date*

Returns a new Date object, its time is set to now plus the interval instance value

**Returns:** *Date*

___

###  toJSON

▸ **toJSON**(): *string*

Returns a string representation for the current instance

**Returns:** *string*

___

###  toLocaleString

▸ **toLocaleString**(`locales?`: string[] | string, `options?`: Intl.DateTimeFormatOptions): *string*

Returns a string representing the current interval using the native toLocaleIntervalString of the Date type.
Warning: if the interval is negative, the locale string will represent a positive time because of the undeflow
behaviour of the conversion to a Date object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`locales?` | string[] &#124; string | an array of locales or a specific locale |
`options?` | Intl.DateTimeFormatOptions | the Intl.DateTimeFormatOptions object  |

**Returns:** *string*

___

###  toString

▸ **toString**(): *string*

Returns a string representation for the current instance

**Returns:** *string*

___

### `Static` compare

▸ **compare**(`t1`: [Interval](interval.md) | string, `t2`: [Interval](interval.md) | string): *number*

Compares two intervals

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t1` | [Interval](interval.md) &#124; string | first operand |
`t2` | [Interval](interval.md) &#124; string | second operand  |

**Returns:** *number*

___

### `Static` equals

▸ **equals**(`t1`: [Interval](interval.md) | string, `t2`: [Interval](interval.md) | string): *boolean*

Checks whether two intervals are equal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t1` | [Interval](interval.md) &#124; string | first Interval or string |
`t2` | [Interval](interval.md) &#124; string | second Interval or string  |

**Returns:** *boolean*

___

### `Static` fromDates

▸ **fromDates**(`from`: Date, `to`: Date): *[Interval](interval.md)*

Returns an Interval object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Date | starting date of the interval |
`to` | Date | ending date of the interval  |

**Returns:** *[Interval](interval.md)*

___

### `Static` fromString

▸ **fromString**(`str`: string): *[Interval](interval.md)*

Returns an Interval object from a string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | a string representation of an Interval  |

**Returns:** *[Interval](interval.md)*

___

### `Static` zero

▸ **zero**(): *[Interval](interval.md)*

Creates an Interval corresponding to 0

**Returns:** *[Interval](interval.md)*
