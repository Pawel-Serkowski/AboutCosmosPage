export interface MoonDataInterface {
    currentMoonPhaseWeekDay: string | null;
    currentMoonPhaseName: string | null;
    fracillum: string | null;
    currentDate: string | null;
}

export interface MoonPhaseValuesInterface {
    [key: string]: string;
}

interface MoonFact {
    id: number | string;
    fact: string;
}

export interface MoonFactsInterface {
    moon_facts: MoonFact[];
}
