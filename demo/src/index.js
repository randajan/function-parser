
import { info, log } from "@randajan/simple-lib/node";
import { fnToStr, strToFn, anyToFn } from "../../dist/index.js";

// Testovací pole pro funkce fnToStr a strToFn
const tests = [
    // fnToStr úspěšné případy
    { exe: () => fnToStr(() => "test", ), shouldThrow: false, expected: '()=>"test"' },
    { exe: () => fnToStr(function foo() { return "bar"; }), shouldThrow: false, expected: '()=>"bar"' },
    { exe: () => fnToStr(function foobar(bar) { return { foo: bar }; }), shouldThrow: false, expected: "bar=>({ foo: bar })" },
    { exe: () => fnToStr(function bar(foo, bar) { console.log(foo, bar); return foo + bar; }), shouldThrow: false, expected: "(foo, bar)=>{console.log(foo, bar); return foo + bar;}" },

    // fnToStr chybové případy
    { exe: () => fnToStr(42), shouldThrow: true, expected: "Stringify function - not a function" },

    // strToFn úspěšné případy
    { exe: () => strToFn("()=>'test'")(), shouldThrow: false, expected: 'test' },
    { exe: () => strToFn("()=>'bar'")(), shouldThrow: false, expected: 'bar' },
    { exe: () => strToFn("bar=>({foo:bar})")("example"), shouldThrow: false, expected: { foo: "example" } },
    { exe: () => strToFn("(foo, bar)=>{ console.log(foo, bar); return foo + bar }")(2, 3), shouldThrow: false, expected: 5 },
    { exe: () => strToFn("_=>foo", {foo:"bar"})(), shouldThrow:false, expected: "bar" },

    // strToFn chybové případy
    { exe: () => strToFn(42), shouldThrow: true, expected: "Stringify function - not a string" },
    { exe: () => strToFn("foo bar=>{ return foo+bar }"), shouldThrow: true, expected: "Parsing arguments - malformatted" },
    { exe: () => strToFn("function foo, bar) { return foo+bar }"), shouldThrow: true, expected: "Parsing common function - arguments are missing left bracket '('" },
    { exe: () => strToFn("function (foo, bar { return foo+bar }"), shouldThrow: true, expected: "Parsing common function - arguments are missing right bracket ')'" },
    { exe: () => strToFn("function (foo, bar) return foo+bar "), shouldThrow: true, expected: "Parsing common function - body missing brackets '{...}'" },
    { exe: () => strToFn("(foo, bar) { return foo+bar }"), shouldThrow: true, expected: "Parsing arrow function - missing the arrow '=>'" },
    { exe: () => strToFn("(foo, bar)=>{ return foo+bar "), shouldThrow: true, expected: "Parsing arrow function - body missing right bracket '}'" },
];

// Funkce pro spuštění testů
function runTests() {
    tests.forEach(({ exe, shouldThrow, expected }, index) => {
        try {
            const result = exe();
            if (shouldThrow) {
                console.error(`Test ${index + 1} failed: Expected error but got result`, result);
            } else {
                const isEqual = JSON.stringify(result) === JSON.stringify(expected);
                console.log(`Test ${index + 1}:`, isEqual ? "Passed" : `Failed - Expected ${JSON.stringify(expected)} but got ${JSON.stringify(result)}`);
            }
        } catch (error) {
            if (shouldThrow) {
                const isEqual = error.message === expected;
                console.log(`Test ${index + 1}:`, isEqual ? "Passed" : `Failed - Expected error "${expected}" but got "${error.message}"`);
            } else {
                console.error(`Test ${index + 1} failed: Unexpected error`, error.message);
            }
        }
    });
}


// Spuštění testovací funkce
runTests();

const fn = anyToFn(/[a-zA-Z]+/g);

console.log(fnToStr(fn));