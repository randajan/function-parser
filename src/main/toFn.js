import { split } from "./_tools";
import { parseArgs } from "./arguments";

const fromStr = (str, injectScope)=>{
    const f = split(str);
    const args = parseArgs(f[0]);
    const body = f[1];
    const origin = new Function(args, body);

    if (!injectScope) { return origin; }

    const keys = Object.keys(injectScope);
    const vals = Object.values(injectScope);


    const injected = new Function([...keys, ...args], body);
    const binded = (...a)=>injected(...vals, ...a);

    return Object.defineProperty(binded, "toString", _=>origin.toString());
}   

const fromAny = (any, type="string")=>{
    let body;
    if (any === undefined) { return new Function(); }

    if (type === "string" || type === "number" || type === "boolean" || type === "bigint") { body = `${any}`; }
    else if (type === "symbol") { throw Error("Creating function - symbol is not supported"); }
    else if (any instanceof Date) { body = `new Date('${any}')`; }
    else if (type === "object") {
        try { body = `(${JSON.stringify(any)})`; }
        catch(e) { throw Error("Creating function - object replication failed"); }
    }
    
    if (!body) { throw Error("Creating function - unknown input"); }
    return new Function(`return ${body}`);
}

export const anyToFn = (any, injectScope)=>{
    const type = typeof any;
    return (type !== "string" || any.startsWith("'")) ? fromAny(any, type) : fromStr(any, injectScope);
}

export const strToFn = (str, injectScope)=>{
    const t = typeof str;
    if (t !== "string") { throw Error("Stringify function - not a string"); }

    return fromStr(str, injectScope);
}