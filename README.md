# @randajan/function-parser

[![NPM](https://img.shields.io/npm/v/@randajan/function-parser.svg)](https://www.npmjs.com/package/@randajan/function-parser) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Effortlessly convert between functions and strings with fnToStr and strToFn. Serialize functions into minimal arrow notation or transform string code into callable functions. Perfect for dynamic JavaScript environments where function manipulation is key.

## Install

```bash
npm install @randajan/function-parser
```

or

```bash
yarn add @randajan/function-parser
```

## Interfaces

### `fnToStr(fn)`

Converts a given JavaScript function to a minimized arrow function string representation.

**Parameters:**
- `fn` (Function): The JavaScript function to convert.

**Returns:**
- (String): A minimized arrow function string representation of the input function.

**Example Usages:**
```javascript
fnToStr(() => "test"); // "()=>'test'"
fnToStr(function foo() { return "bar"; }); // "()=>'bar'"
fnToStr(function foobar(bar) { return { foo: bar }; }); // "bar=>({ foo: bar })"
fnToStr(function bar(foo, bar) { console.log(foo, bar); return foo + bar; }); // "(foo, bar)=>{console.log(foo, bar); return foo + bar;}"
```

**Errors:**
- Throws `"Stringify function - not a function"` if the input is not a valid JavaScript function.


### `strToFn(str)`

Converts a given common or arrow function string representation back to an executable JavaScript function.

**Parameters:**
- `str` (String): The arrow function in string form to convert back to a JavaScript function.

**Returns:**
- (Function): The function created from the input string.

**Example Usages:**
```javascript
strToFn("()=>'test'")(); // 'test'
strToFn("()=>'bar'")(); // 'bar'
strToFn("bar=>({foo:bar})")("example"); // { foo: "example" }
strToFn("(foo, bar)=>{ console.log(foo, bar); return foo + bar }")(2, 3); // Logs 2, 3 and returns 5
```

**Errors:**
- Throws `"Stringify function - not a string"` if the input is not a valid string.
- Throws `"Parsing arguments - malformatted"` if the arguments list in `str` is malformed.
- Throws `"Parsing common function - arguments are missing left bracket '('"` if the left bracket `(` is missing in a traditional function argument list.
- Throws `"Parsing common function - arguments are missing right bracket ')'"` if the right bracket `)` is missing in a traditional function argument list.
- Throws `"Parsing common function - body missing brackets '{...}'"` if the function body is missing `{}` in a traditional function.
- Throws `"Parsing arrow function - missing the arrow '=>'` if the arrow (`=>`) is missing in the arrow function syntax.
- Throws `"Parsing arrow function - body missing right bracket '}'"` if the body of the arrow function is missing the closing bracket `}`.


### `anyToFn(any)`

Converts a given value (`any`) into a function that, when called, returns the original value.

**Parameters:**
- `any` (Any): The value to be wrapped in a function. Supported types include `string`, `number`, `boolean`, `bigint`, `object`, and `Date`.

**Returns:**
- (Function): A function that returns the original `any` value.

**Behavior:**
- If `any` is a valid value, `anyToFn` will convert it into a function returning `any` when executed.
- If `any` is a string that doesn’t start with a single quote (`'`), `anyToFn` interprets it as a function string and attempts to parse it as a function using `strToFn`.
- For unsupported types or invalid inputs, `anyToFn` throws a descriptive error.

**Example Usages:**
```javascript
anyToFn("'Hello'")(); // Returns "Hello"
anyToFn(42)(); // Returns 42
anyToFn(true)(); // Returns true
anyToFn(new Date("2024-01-01"))(); // Returns a Date object representing 2024-01-01
anyToFn({ foo: "bar" })(); // Returns { foo: "bar" }
anyToFn("(a, b) => a + b")(3, 4); // Returns 7
```

**Errors:**
- `"Creating function - symbol is not supported"`: Raised if `any` is of type `symbol`.
- `"Creating function - object replication failed"`: Raised if `any` is an object that cannot be stringified (e.g., contains circular references).
- `"Creating function - unknown input"`: Raised if `any` is of an unsupported or unrecognized type.

Happy hacking

## License

MIT © [randajan](https://github.com/randajan)
