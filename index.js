const Validator = require('fastest-validator');
const v = new Validator();

function isObject(value) {
	return (
		!(value instanceof Date) &&
		!Array.isArray(value) &&
		!Object.is(value, null) &&
		!Object.is(value, undefined) &&
		!(value instanceof Function)
	);
}


function validate_or_throw(obj, schema) {

	if (!isObject(obj)) throw new Error('First argument must be an Object');

	const check = v.compile(schema);
	const valid = check(obj);

	if (valid !== true) {
		throw new Error(
			`Validation Error! \n  - ${valid
				.map((e) => e.message)
				.join('\n  - ')}`
		);
	}
}

module.exports = validate_or_throw;
