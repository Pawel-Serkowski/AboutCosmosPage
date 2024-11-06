import { MoonInfoBlocks, RandomMoonFactsBlocks, FormDialogComponent } from "./js-components.js";

import { MoonPhaseValuesInterface, MoonDataInterface } from "./interfaces.js";

const moonPhaseValues: MoonPhaseValuesInterface = {
    "New Moon": "",
    "Waxing Crescent": "-",
    "First Quarter": "-",
    "Waxing Gibbous": "-",
    "Full Moon": "",
    "Waning Gibbous": "",
    "Last Quarter": "",
    "Waning Crescent": "",
};

const anyErrorBlock = `<p>Any errors?</p>
                        <button class="button outline" onclick="onFormOpenDialogHandler()">Write to me</button>`;

async function getMoonData(lat: number, long: number, date: string): Promise<MoonDataInterface> {
    const moonReturnData = {
        currentMoonPhaseWeekDay: "",
        currentMoonPhaseName: "",
        fracillum: "",
        currentDate: "",
    };
    try {
        const response = await fetch(`https://aa.usno.navy.mil/api/rstt/oneday?date=${date}&coords=${lat},${long}&body=moon&tz=1`);
        const responseData = await response.json();
        const moonData: any = responseData.properties.data;

        let moonPhasePercent: string;
        if (moonData.curphase === "New Moon") {
            moonPhasePercent = moonPhaseValues[moonData.closestphase.phase] + moonData.fracillum;
        } else {
            moonPhasePercent = moonPhaseValues[moonData.curphase] + moonData.fracillum;
        }

        moonReturnData.fracillum = moonData.fracillum;
        moonReturnData.currentMoonPhaseName = moonData.curphase;
        moonReturnData.currentDate = `${moonData.day}.${moonData.month}.${moonData.year}`;
        moonReturnData.currentMoonPhaseWeekDay = moonData.day_of_week;

        if (moonReturnData.fracillum === "") {
            throw new Error("Something went wrong");
        }

        return moonReturnData;
    } catch (error) {
        throw new Error("We can't load a data for you.");
    }
}

$(document).ready(async () => {
    $("#moon-facts-container").html(RandomMoonFactsBlocks());
    $("#anyErrors").html(anyErrorBlock);
    $("#form-dialog").html(FormDialogComponent());
    $(document).tooltip();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                if (position) {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    const todayDate = new Date();
                    const formattedDate = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;

                    try {
                        const moonData = await getMoonData(lat, long, formattedDate);
                        document.documentElement.style.setProperty("--moonPhasePercent", moonData.fracillum);
                        $("#moonInfo").html(MoonInfoBlocks(moonData));
                    } catch (error) {
                        if (error instanceof Error) {
                            const errorMessage: string = error.message;
                            $("#moonInfo").html(
                                MoonInfoBlocks(
                                    { currentMoonPhaseWeekDay: "", currentMoonPhaseName: "", fracillum: "", currentDate: "" },
                                    errorMessage,
                                ),
                            );
                        } else {
                            $("#moonInfo").html(
                                MoonInfoBlocks(
                                    { currentMoonPhaseWeekDay: "", currentMoonPhaseName: "", fracillum: "", currentDate: "" },
                                    "Something gone wrong :(",
                                ),
                            );
                        }
                    }
                }
            },
            function (error) {
                const message = error.message;
                $("#moonInfo").html(
                    MoonInfoBlocks({ currentMoonPhaseWeekDay: "", currentMoonPhaseName: "", fracillum: "", currentDate: "" }, message),
                );
            },
        );
    }
});
