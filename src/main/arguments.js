import { unbracket } from "./_tools";

export const argRegExp = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
export const parseArgs = (args)=>{
    if (args == null) { throw Error("Parsing arguments - missing"); }
    args = unbracket(args.trim());

    let result = [];
    if (args) {
        for (let a of args.split(",")) {
            a = a.trim();
            if (!argRegExp.test(a)) { throw Error("Parsing arguments - malformatted"); }
            result.push(a);
        }
    }

    return result;
}