var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import { MoonInfoBlocks, RandomMoonFactsBlocks, FormDialogComponent } from "./js-components.js";
const moonPhaseValues = {
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
function getMoonData(lat, long, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const moonReturnData = {
            currentMoonPhaseWeekDay: "",
            currentMoonPhaseName: "",
            fracillum: "",
            currentDate: "",
        };
        try {
            const response = yield fetch(`https://aa.usno.navy.mil/api/rstt/oneday?date=${date}&coords=${lat},${long}&body=moon&tz=1`);
            const responseData = yield response.json();
            const moonData = responseData.properties.data;
            let moonPhasePercent;
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
    });
}
$(document).ready(() =>
    __awaiter(void 0, void 0, void 0, function* () {
        $("#moon-facts-container").html(RandomMoonFactsBlocks());
        // $("#anyErrors").html(anyErrorBlock);
        document.getElementById("anyErrors").innerHTML = anyErrorBlock;
        $("#form-dialog").html(FormDialogComponent());
        $(document).tooltip();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (position) {
                            const lat = position.coords.latitude;
                            const long = position.coords.longitude;
                            const todayDate = new Date();
                            const formattedDate = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
                            try {
                                const moonData = yield getMoonData(lat, long, formattedDate);
                                document.documentElement.style.setProperty("--moonPhasePercent", moonData.fracillum);
                                $("#moonInfo").html(MoonInfoBlocks(moonData));
                            } catch (error) {
                                if (error instanceof Error) {
                                    const errorMessage = error.message;
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
                    });
                },
                function (error) {
                    const message = error.message;
                    $("#moonInfo").html(
                        MoonInfoBlocks({ currentMoonPhaseWeekDay: "", currentMoonPhaseName: "", fracillum: "", currentDate: "" }, message),
                    );
                },
            );
        }
    }),
);
