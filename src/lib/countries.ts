export type CountryISO = "Al" | "Am" | "Au" | "At" | "Az" | "Be" | "Hr" | "Cy" | "Cz" | "Dk" | "Ee" |
    "Fi" | "Fr" | "Ge" | "De" | "Gr" | "Is" | "Ie" | "Il" | "It" | "Lv" | "Lt" | "Lu" | "Mt" | "Md" |
    "Nl" | "No" | "Pl" | "Pt" | "Sm" | "Rs" | "Sl" | "Es" | "Se" | "Ch" | "Ua" | "Gb";

export function getCountryName(country: CountryISO, lang: "en" | "de"): string {
    const mapping: Map<CountryISO, { en: string, de: string }> = new Map([
        ["Am", { en: "Armenia", de: "Armenien" }],
        ["Al", { en: "Albania", de: "Albanien" }],
        ["Au", { en: "Australia", de: "Australien" }],
        ["At", { en: "Austria", de: "Österreich" }],
        ["Az", { en: "Azerbaijan", de: "Aserbaidschan" }],
        ["Be", { en: "Belgium", de: "Belgien" }],
        ["Hr", { en: "Croatia", de: "Kroatien" }],
        ["Cy", { en: "Cyprus", de: "Zypern" }],
        ["Cz", { en: "Czechia", de: "Tschechien" }],
        ["Dk", { en: "Denmark", de: "Dänemark" }],
        ["Ee", { en: "Estonia", de: "Estland" }],
        ["Fi", { en: "Finland", de: "Finnland" }],
        ["Fr", { en: "France", de: "Frankreich" }],
        ["Ge", { en: "Georgia", de: "Georgien" }],
        ["De", { en: "Germany", de: "Deutschland" }],
        ["Gr", { en: "Greece", de: "Griechenland" }],
        ["Is", { en: "Iceland", de: "Island" }],
        ["Ie", { en: "Ireland", de: "Irland" }],
        ["Il", { en: "Israel", de: "Israel" }],
        ["It", { en: "Italy", de: "Italien" }],
        ["Lv", { en: "Latvia", de: "Lettland" }],
        ["Lt", { en: "Lithuania", de: "Litauen" }],
        ["Lu", { en: "Luxembourg", de: "Luxemburg" }],
        ["Mt", { en: "Malta", de: "Malta" }],
        ["Md", { en: "Moldova", de: "Moldawien" }],
        ["Nl", { en: "Netherlands", de: "Niederlande" }],
        ["No", { en: "Norway", de: "Norwegen" }],
        ["Pl", { en: "Poland", de: "Polen" }],
        ["Pt", { en: "Portugal", de: "Portugal" }],
        ["Sm", { en: "San Marino", de: "San Marino" }],
        ["Rs", { en: "Serbia", de: "Serbien" }],
        ["Sl", { en: "Slovenia", de: "Slowenien" }],
        ["Es", { en: "Spain", de: "Spanien" }],
        ["Se", { en: "Sweden", de: "Schweden" }],
        ["Ch", { en: "Switzerland", de: "Schweiz" }],
        ["Ua", { en: "Ukraine", de: "Ukraine" }],
        ["Gb", { en: "United Kingdom", de: "Großbritannien" }]
    ]);
    return mapping.get(country)?.[lang] ?? 'Undefined';
}