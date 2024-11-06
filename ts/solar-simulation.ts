function checkboxValueChangeHandler(planetId: string) {
    $("#" + planetId).toggle("hide");
}

function checkboxBlock(): string {
    return `
                    <p>
                        <input type="checkbox" id="mercuryInput"  checked onchange="checkboxValueChangeHandler('mercury')" />
                        <label for="mercuryInput">Mercury</label>
                    </p>
                    <p>
                        <input type="checkbox" id="venusInput" checked onchange="checkboxValueChangeHandler('venus')"/>
                        <label for="venusInput">Venus</label>
                    </p>
                    <p>
                        <input type="checkbox" id="earthInput"  checked /onchange="checkboxValueChangeHandler('earth')">
                        <label for="earthInput">Earth</label>
                    </p>
                    <p>
                        <input type="checkbox" id="marsInput" checked onchange="checkboxValueChangeHandler('mars')"/>
                        <label for="marsInput">Mars</label>
                    </p>
                    <p>
                        <input type="checkbox" id="juptierInput"  checked onchange="checkboxValueChangeHandler('jupiter')"/>
                        <label for="jupiterInput">Jupiter</label>
                    </p>
                    <p>
                        <input type="checkbox" id="saturnInput" checked onchange="checkboxValueChangeHandler('saturn')"/>
                        <label for="saturnInput">Saturn</label>
                    </p>
                    <p>
                        <input type="checkbox" id="uranInput"  checked onchange="checkboxValueChangeHandler('uran')"/>
                        <label for="uranInput">Uran</label>
                    </p>
                    <p>
                        <input type="checkbox" id="neptunInput" checked onchange="checkboxValueChangeHandler('neptun')"/>
                        <label for="neptunInput">Neptun</label>
                    </p>
    `;
}

$(document).ready(() => {
    $("#checkboxHolder").html(checkboxBlock());
});
