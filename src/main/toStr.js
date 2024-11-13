import { unbracket, split } from "./_tools";
import { argRegExp } from "./arguments";


export const fnToStr = fn=>{
    const t = typeof fn;
    if (t !== "function") { throw Error("Stringify function - not a function"); }

    const f = split(fn.toString());

    let args = unbracket(f[0]);
    if (!args || !argRegExp.test(args)) { args = `(${args})`; }

    let body = f[1];
    if (!body.startsWith("return")) { body = `{${body}}`; }
    else {
        body = body.slice(6).trim().replace(/;[\s\S]*$/, "");
        if (!body) { body = "{}"; }
        else if (body.startsWith("{")) { body = "("+body+")"; }
    }

    return `${args}=>${body}`;
    
}