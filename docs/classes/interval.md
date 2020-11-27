[@cdellacqua/interval](../README.md) › [Interval](interval.md)

# Class: Interval

Interval class, supports positive and negative intervals (from -23:59:59 to 00:00:00)

## Hierarchy

* **Interval**

## Index

### Constructors

* [constructor](interval.md#constructor)

### Properties

* [_d](interval.md#_d)
* [_h](interval.md#_h)
* [_m](interval.md#_m)
* [_s](interval.md#_s)
* [_sign](interval.md#_sign)
* [regex](interval.md#static-readonly-regex)

### Accessors

* [d](interval.md#d)
* [h](interval.md#h)
* [isNegative](interval.md#isnegative)
* [isPositive](interval.md#ispositive)
* [m](interval.md#m)
* [s](interval.md#s)
* [sign](interval.md#sign)
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
* [fromDate](interval.md#static-fromdate)
* [fromString](interval.md#static-fromstring)
* [zero](interval.md#static-zero)

## Constructors

###  constructor

\+ **new Interval**(`sign`: number, `d`: number, `h`: number, `m`: number, `s?`: undefined | number): *[Interval](interval.md)*

Constructs an Interval object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sign` | number | +1 or -1 |
`d` | number | days |
`h` | number | hours |
`m` | number | minutes |
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
`str` | string | a string representation of an Interval (-)D:HH:MM:SS  |

**Returns:** *[Interval](interval.md)*

## Properties

###  _d

• **_d**: *number*

___

###  _h

• **_h**: *number*

___

###  _m

• **_m**: *number*

___

###  _s

• **_s**: *number*

___

###  _sign

• **_sign**: *number* = 1

___

### `Static` `Readonly` regex

▪ **regex**: *RegExp‹›* = /^(-?)(\d+:)?(\d+:)?(\d+:)?(\d+)$/

regex for format (-)D:H:M:S

## Accessors

###  d

• **get d**(): *number*

Gets the days of the current Interval instance

**Returns:** *number*

• **set d**(`v`: number): *void*

Sets the days (0-23) of the current Interval instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer  |

**Returns:** *void*

___

###  h

• **get h**(): *number*

Gets the hours (0-23) of the current Interval instance

**Returns:** *number*

• **set h**(`v`: number): *void*

Sets the hour (0-23) of the current Interval instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer, if it exceeds the valid representation, it will overflow (for example 25 becomes 1)  |

**Returns:** *void*

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

• **set m**(`v`: number): *void*

Sets the minutes (0-59) of the current Interval instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)  |

**Returns:** *void*

___

###  s

• **get s**(): *number*

Gets the seconds (0-59) of the current Interval instance

**Returns:** *number*

• **set s**(`v`: number): *void*

Sets the seconds (0-59) of the current Interval instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)  |

**Returns:** *void*

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

▸ **toDate**(`year`: number, `month`: number, `date`: number): *Date*

Returns a Date object with the interval of day set according to this instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`year` | number | year |
`month` | number | month |
`date` | number | date  |

**Returns:** *Date*

▸ **toDate**(`date`: Date): *Date*

Returns a new Date object with the interval of day set according to this instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | the reference Date the year, month and date will be extracted from  |

**Returns:** *Date*

▸ **toDate**(): *Date*

Returns a new Date object with the interval of day set according to this instance

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

### `Static` fromDate

▸ **fromDate**(`from`: Date, `to`: Date): *[Interval](interval.md)*

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
