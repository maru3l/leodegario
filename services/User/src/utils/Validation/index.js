import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import ValidationError from './ValidationError';
import ValidatorError from './ValidatorError';

const ajv = new Ajv({
  allErrors: true,
});

ajvErrors(ajv);
ajvFormats(ajv);

function parseErrors(errors) {
  return errors.map((error) => {
    const {keyword: type, instancePath: path, message = ''} = error;

    let field = (path.split('/') || []).pop();
    const params = {};

    switch (type) {
      case 'maxItems':
      case 'minItems':
      case 'maxLength':
      case 'minLength':
      case 'maxProperties':
      case 'minProperties':
      case 'additionalItems':
        params.limit = error.params.limit;
        break;

      case 'additionalProperties':
        params.additionalProperty = error.params.additionalProperty;
        break;

      case 'dependencies':
        params.property = error.params.property;
        params.missingProperty = error.params.missingProperty;
        params.deps = error.params.deps;
        params.depsCount = error.params.depsCount;
        break;

      case 'format':
        params.format = error.params.format;
        break;

      case 'maximum':
      case 'minimum':
      case 'exclusiveMaximum':
      case 'exclusiveMinimum':
        params.limit = error.params.limit;
        params.comparison = error.params.comparison;
        break;

      case 'multipleOf':
        params.multipleOf = error.params.multipleOf;
        break;

      case 'pattern':
        params.pattern = error.params.pattern;
        break;

      case 'required':
        field = error.params.missingProperty;
        break;

      case 'propertyNames':
        field = error.params.propertyNames;
        break;

      default:
        break;
    }

    return new ValidatorError({type, path, message, field, params});
  });
}

export default function createValidate(schema) {
  const validate = ajv.compile(schema);
  return (values) => {
    const valid = validate(values);

    if (!valid) {
      const errors = parseErrors(validate.errors);

      throw new ValidationError({errors});
    }

    return {values, errors: validate.errors || []};
  };
}
