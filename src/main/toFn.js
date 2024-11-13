import { split } from "./_tools";
import { parseArgs } from "./arguments";

const fromStr = str=>{
    const f = split(str);
    return new Function(parseArgs(f[0]), f[1]);
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

export const anyToFn = any=>{
    const type = typeof any;
    return (type !== "string" || any.startsWith("'")) ? fromAny(any, type) : fromStr(any);
}

export const strToFn = str=>{
    const t = typeof str;
    if (t !== "string") { throw Error("Stringify function - not a string"); }

    return fromStr(str);
}