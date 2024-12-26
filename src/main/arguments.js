import { unbracket } from "./_tools";

export const argRegExp = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
export const parseArgs = (args, to=[])=>{
    if (args == null) { throw Error("Parsing arguments - missing"); }
    args = unbracket(args.trim());

    if (args) {
        for (let a of args.split(",")) {
            a = a.trim();
            if (!argRegExp.test(a)) { throw Error("Parsing arguments - malformatted"); }
            to.push(a);
        }
    }

    return to;
}