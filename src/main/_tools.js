

export const unbracket = (str, br="()")=>{
    if (!str) { return str; }
    if (!str.startsWith(br[0])) { return str; }
    if (!str.endsWith(br[1])) { return; }
    return str.slice(1, -1).trim();
}

const splitCommon = fstr=>{
    const lba = fstr.indexOf("(");
    if (lba < 0) { throw Error( "Parsing common function - arguments are missing left bracket '('" ); }
    fstr = fstr.slice(lba);

    const rba = fstr.indexOf(")")+1;
    if (rba <= 0) { throw Error( "Parsing common function - arguments are missing right bracket ')'" ); }

    const args = fstr.slice(0, rba).trim();
    const body = fstr.slice(rba).trim();

    if (!body.startsWith("{") || !body.endsWith("}")) {
        throw Error( "Parsing common function - body missing brackets '{...}'" );
    }

    return [args, body.slice(1, -1).trim()];
}

const splitArrow = fstr=>{
    const frags = fstr.split("=>");
    if (frags.length <= 1) {
        throw Error( "Parsing arrow function - missing the arrow '=>'" );
    }

    const args = frags.shift().trim();
    let body = frags.join("=>").trim();

    if (!body.startsWith("{")) { body = `return ${body}`; }
    else if (!body.endsWith("}")) {
        throw Error( "Parsing arrow function - body missing right bracket '}'" );
    }
    else { body = body.slice(1, -1).trim(); }

    return [args, body];
}

export const split = fstr=>{
    fstr = fstr.trim().replace(/\s+/g, " ");
    return fstr.startsWith("function") ? splitCommon(fstr) : splitArrow(fstr);
}