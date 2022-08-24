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
	const sep = '\n'+'-'.repeat(process.stdout.columns)

	if (valid !== true) {
		console.log(valid);
		throw new Error(
			`VALIDATION ERRORS!${sep}` + valid.map(o=>`\n\tType: ${o.type}\n\tMessage: ${o.message}\n\tField: ${o.field}\n\tExpected: ${o.expected}\n\tGot: ${o.actual}`).join(sep) + sep + '\n\n'
		);
	}
}

module.exports = validate_or_throw;
