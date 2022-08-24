# validate-or-throw

A tiny wrapper around fastest-validator to either validate an object against a given schema or throw an error.

## To use

```javascript
const ValidateOrThrow = require('validate-or-throw');

let obj = {
	str: 'this is a str',
	num: 2,
};

let schema = {
	str: 'string',
	num: 'number',
};

ValidateOrThrow(obj, schema);
```

## Why?

This wrapper was written to quickly validate options passed to methods or class constructors. More like [aproba](https://www.npmjs.com/package/aproba) is used to do, but with the power and flexibility that [fastest-validator](https://www.npmjs.com/package/fastest-validator) brings (like adding default values).

That is why it throws early to help avoid the scenario where you are using mis-formatted options and other object arguments.

# Example usage with a class constructor

```javascript
const validateOrThrow = require('validate-or-throw');

class Developer {
	constructor(options) {
		let schema = {
			// we expect one option, name to be a string
			name: 'string',
            // we also expect an age option, but where none is entered, we default to 99
			age: { type: 'number', optional: true, default: 99 },
		};

		// Now Validate or throw error so we do not continue with wrong options
		validateOrThrow(options, schema);

		this.options = options;

        // proceed with the rest of the code safely...
	}
}

let dev = new Developer({ name: 'Anthony Mugendi' });

console.log(dev);

// => Developer { options: { name: 'Anthony Mugendi', age: 99 } }
```
