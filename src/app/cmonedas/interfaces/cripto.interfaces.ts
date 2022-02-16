// To parse this data:
//
//   import { Convert } from "./file";
//
//   const criptoMoneda = Convert.toCriptoMoneda(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CriptoMoneda {
    id:                    string;
    currency:              string;
    symbol:                string;
    name:                  string;
    logo_url:              string;
    status:                Status;
    price:                 string;
    price_date?:           Date;
    price_timestamp?:      Date;
    circulating_supply?:   string;
    max_supply?:           string;
    market_cap?:           string;
    market_cap_dominance?: string;
    num_exchanges?:        string;
    num_pairs?:            string;
    num_pairs_unmapped?:   string;
    first_candle?:         Date;
    first_trade?:          Date;
    first_order_book?:     Date;
    rank?:                 string;
    rank_delta?:           string;
    high?:                 string;
    high_timestamp?:       Date;
    "1d"?:                 The1_D;
    "7d"?:                 The1_D;
    "30d"?:                The1_D;
    "365d"?:               The1_D;
    ytd?:                  The1_D;
    platform_currency?:    PlatformCurrency;
    first_priced_at?:      Date;
}

export interface The1_D {
    volume:                 string;
    price_change:           string;
    price_change_pct:       string;
    volume_change?:         string;
    volume_change_pct?:     string;
    market_cap_change?:     string;
    market_cap_change_pct?: string;
}

export enum PlatformCurrency {
    APL = "APL",
    Ada = "ADA",
    Aiot2 = "AIOT2",
    Algo = "ALGO",
    Arbeth = "ARBETH",
    Ardr = "ARDR",
    Atom = "ATOM",
    Aurora3 = "AURORA3",
    Avax = "AVAX",
    Bch = "BCH",
    Bers = "BERS",
    Bitci = "BITCI",
    Bnb = "BNB",
    Boba = "BOBA",
    Btm = "BTM",
    Bts = "BTS",
    Celo = "CELO",
    Cfx2 = "CFX2",
    Chz = "CHZ",
    Cro = "CRO",
    Dash = "DASH",
    EOS = "EOS",
    Ec4 = "EC4",
    Ecoc = "ECOC",
    Egld = "EGLD",
    Ela = "ELA",
    Etc = "ETC",
    Eth = "ETH",
    Etp = "ETP",
    Fct = "FCT",
    Fsn = "FSN",
    Ftm = "FTM",
    Fuse = "FUSE",
    Gbyte = "GBYTE",
    Go = "GO",
    HT = "HT",
    Harmony = "HARMONY",
    Hoo = "HOO",
    Hydra = "HYDRA",
    Icoo = "ICOO",
    Icx = "ICX",
    Ion = "ION",
    Iotx = "IOTX",
    Kai2 = "KAI2",
    Kcs = "KCS",
    Klay = "KLAY",
    Kmd = "KMD",
    Luna = "LUNA",
    Matic = "MATIC",
    Metis = "METIS",
    Mintme = "MINTME",
    Movr = "MOVR",
    Near = "NEAR",
    Neo = "NEO",
    Nuls = "NULS",
    Nxt = "NXT",
    Odin = "ODIN",
    Okt = "OKT",
    Omni = "OMNI",
    Ont = "ONT",
    Opeth = "OPETH",
    Pls = "PLS",
    Qtum = "QTUM",
    Rbtc = "RBTC",
    Regen = "REGEN",
    Scrt = "SCRT",
    Sero = "SERO",
    Snv2 = "SNV2",
    Sol = "SOL",
    TRON = "TRON",
    Theta = "THETA",
    Tomo = "TOMO",
    True = "TRUE",
    Trx = "TRX",
    Vet = "VET",
    Vex = "VEX",
    Vite = "VITE",
    Vlx = "VLX",
    WAN = "WAN",
    Waves = "WAVES",
    Weth = "WETH",
    Xcp = "XCP",
    Xdai = "XDAI",
    Xdc = "XDC",
    Xdce = "XDCE",
    Xem = "XEM",
    Xlm = "XLM",
    Xqg = "XQG",
    Xrp = "XRP",
    Xscoin = "XSCOIN",
    Xtz = "XTZ",
    Xwc = "XWC",
    Yoc = "YOC",
    Zenith = "ZENITH",
    Zil = "ZIL",
}

export enum Status {
    Active = "active",
    Dead = "dead",
    Inactive = "inactive",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCriptoMoneda(json: string): CriptoMoneda[] {
        return cast(JSON.parse(json), a(r("CriptoMoneda")));
    }

    public static criptoMonedaToJson(value: CriptoMoneda[]): string {
        return JSON.stringify(uncast(value, a(r("CriptoMoneda"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "CriptoMoneda": o([
        { json: "id", js: "id", typ: "" },
        { json: "currency", js: "currency", typ: "" },
        { json: "symbol", js: "symbol", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "logo_url", js: "logo_url", typ: "" },
        { json: "status", js: "status", typ: r("Status") },
        { json: "price", js: "price", typ: "" },
        { json: "price_date", js: "price_date", typ: u(undefined, Date) },
        { json: "price_timestamp", js: "price_timestamp", typ: u(undefined, Date) },
        { json: "circulating_supply", js: "circulating_supply", typ: u(undefined, "") },
        { json: "max_supply", js: "max_supply", typ: u(undefined, "") },
        { json: "market_cap", js: "market_cap", typ: u(undefined, "") },
        { json: "market_cap_dominance", js: "market_cap_dominance", typ: u(undefined, "") },
        { json: "num_exchanges", js: "num_exchanges", typ: u(undefined, "") },
        { json: "num_pairs", js: "num_pairs", typ: u(undefined, "") },
        { json: "num_pairs_unmapped", js: "num_pairs_unmapped", typ: u(undefined, "") },
        { json: "first_candle", js: "first_candle", typ: u(undefined, Date) },
        { json: "first_trade", js: "first_trade", typ: u(undefined, Date) },
        { json: "first_order_book", js: "first_order_book", typ: u(undefined, Date) },
        { json: "rank", js: "rank", typ: u(undefined, "") },
        { json: "rank_delta", js: "rank_delta", typ: u(undefined, "") },
        { json: "high", js: "high", typ: u(undefined, "") },
        { json: "high_timestamp", js: "high_timestamp", typ: u(undefined, Date) },
        { json: "1d", js: "1d", typ: u(undefined, r("The1_D")) },
        { json: "7d", js: "7d", typ: u(undefined, r("The1_D")) },
        { json: "30d", js: "30d", typ: u(undefined, r("The1_D")) },
        { json: "365d", js: "365d", typ: u(undefined, r("The1_D")) },
        { json: "ytd", js: "ytd", typ: u(undefined, r("The1_D")) },
        { json: "platform_currency", js: "platform_currency", typ: u(undefined, r("PlatformCurrency")) },
        { json: "first_priced_at", js: "first_priced_at", typ: u(undefined, Date) },
    ], false),
    "The1_D": o([
        { json: "volume", js: "volume", typ: "" },
        { json: "price_change", js: "price_change", typ: "" },
        { json: "price_change_pct", js: "price_change_pct", typ: "" },
        { json: "volume_change", js: "volume_change", typ: u(undefined, "") },
        { json: "volume_change_pct", js: "volume_change_pct", typ: u(undefined, "") },
        { json: "market_cap_change", js: "market_cap_change", typ: u(undefined, "") },
        { json: "market_cap_change_pct", js: "market_cap_change_pct", typ: u(undefined, "") },
    ], false),
    "PlatformCurrency": [
        "APL",
        "ADA",
        "AIOT2",
        "ALGO",
        "ARBETH",
        "ARDR",
        "ATOM",
        "AURORA3",
        "AVAX",
        "BCH",
        "BERS",
        "BITCI",
        "BNB",
        "BOBA",
        "BTM",
        "BTS",
        "CELO",
        "CFX2",
        "CHZ",
        "CRO",
        "DASH",
        "EOS",
        "EC4",
        "ECOC",
        "EGLD",
        "ELA",
        "ETC",
        "ETH",
        "ETP",
        "FCT",
        "FSN",
        "FTM",
        "FUSE",
        "GBYTE",
        "GO",
        "HT",
        "HARMONY",
        "HOO",
        "HYDRA",
        "ICOO",
        "ICX",
        "ION",
        "IOTX",
        "KAI2",
        "KCS",
        "KLAY",
        "KMD",
        "LUNA",
        "MATIC",
        "METIS",
        "MINTME",
        "MOVR",
        "NEAR",
        "NEO",
        "NULS",
        "NXT",
        "ODIN",
        "OKT",
        "OMNI",
        "ONT",
        "OPETH",
        "PLS",
        "QTUM",
        "RBTC",
        "REGEN",
        "SCRT",
        "SERO",
        "SNV2",
        "SOL",
        "TRON",
        "THETA",
        "TOMO",
        "TRUE",
        "TRX",
        "VET",
        "VEX",
        "VITE",
        "VLX",
        "WAN",
        "WAVES",
        "WETH",
        "XCP",
        "XDAI",
        "XDC",
        "XDCE",
        "XEM",
        "XLM",
        "XQG",
        "XRP",
        "XSCOIN",
        "XTZ",
        "XWC",
        "YOC",
        "ZENITH",
        "ZIL",
    ],
    "Status": [
        "active",
        "dead",
        "inactive",
    ],
};
