const infoPanel = document.getElementById("info-content");
const map = L.map("map");

const startLocation=[22.302711,114.177216];
const startZoom = 11;

const resetControl =L.Control.extend({
    options: {position: "bottomleft"},
    onAdd: function(map){
        const Button = L.DomUtil.create(
            "button",
            "reset-button"
        );

        Button.innerHTML ="Reset map";
        Button.onclick = function() {
    map.flyTo(startLocation,startZoom, {duration:2});
    map.closePopup();
    infoPanel.innerHTML = `<h2>Project scope</h2>
                <p>
                This map showcases all the different spots in Hong Kong where I've
                felt able to escape from reality or create distance to gain perspective.
                It explores the use of urban design
                as a means of an oasis or an escape as well as gaining a perspective on
                nature as part of the inherent cultural heritage of a place.
                </p>
                <p>
                Hong Kong has granted me a lot of space for self reflection and these spaces
                have been vessels for that in different ways.
                </p>
                <p>
                They are all spaces I wouldn't cross through in my daily life but 
                instead spaces I need to actively seek out. At the same time a lot
                of these locations can be woven into a functioning day to day, to make space for 
                reflection and awareness. 
                </p>`
    };
    return Button;}
});

map.addControl(new resetControl());

map.setView(startLocation,startZoom);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function showInfo(place) {
    infoPanel.innerHTML = `
    <h2>${place.name}</h2>
    <img src="${place.img}" alt="${place.name}">
    <p>${place.desc}</p>
    `;
};

places.forEach(function(place) {
    const marker= L.marker([place.lat,place.lng])
        .addTo(map)
        .bindTooltip(`
        <h3>${place.name}</h3>
        `, {
            direction: "top",
            offset: [-15, -10]
        });
    
    marker.on("click", function() {
        showInfo(place);
        map.flyTo([place.lat,place.lng], 15, {duration: 2});
    });
});

/*bra idé att lägga in fler kartknappar där man kan 
kategorisera platser och endast visa vissa
beroende på vad användaren vill se? ska markörer ha olika 
färg beroende på kategori? vore coolt lowkey.
*/
