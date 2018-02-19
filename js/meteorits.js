function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    data = JSON.parse(data);
    var dbid = 1;
    var dbmass = 1;
    var dbname = 1;
    var dbrec = 1;

    table(data);
    document.querySelector('#id').addEventListener('click', function () {
        dbid = dbid * -1;
        dbmass = 1;
        dbname = 1;
        dbrec = 1;
        data.sort(function (a, b) {
            a.id = parseInt(a.id);
            b.id = parseInt(b.id);
            if (a.id < b.id) {
                return dbid;
            } else {
                return -dbid;
            }
        });
        table(data);
    });
    document.querySelector('#mass').addEventListener('click', function () {
        dbmass = dbmass * -1;
        dbid = 1;
        dbname = 1;
        dbrec = 1;
        data.sort(function (a, b) {
            a.mass = parseInt(a.mass);
            b.mass = parseInt(b.mass);
            if (Number.isNaN(a.mass)) {
                a.mass = 0;
            }
            if (Number.isNaN(b.mass)) {
                b.mass = 0;
            }
            if (a.mass < b.mass) {
                return dbmass;
            } else {
                return -dbmass;
            }
        });
        table(data);
    });
    document.querySelector('#name').addEventListener('click', function () {
        dbname = dbname * -1;
        dbid = 1;
        dbmass = 1;
        dbrec = 1;
        data.sort(function (a, b) {

            if (a.name < b.name) {
                return dbname;
            } else {
                return -dbname;
            }
        });
        table(data);
    });
    document.querySelector('#recclass').addEventListener('click', function () {
        dbrec = dbrec * -1;
        dbid = 1;
        dbname = 1;
        dbmass = 1;
        data.sort(function (a, b) {

            if (a.recclass < b.recclass) {
                return dbrec;
            } else {
                return -dbrec;
            }
        });
        table(data);
    });

    var sum = 0;
    var minMass = 0;
    var maxMass = 0
    var avg = 0;
    var dbYear = 0;
    var dbMinMass = 0;
    var weight = 0;
    for (var i in data) {
        weight = parseInt(data[i].mass);
        var datum = new Date(data[i].year);
        if (!Number.isNaN(weight)) {
            sum += weight;
        }
        if (weight < minMass && !Number.isNaN(weight)) {
            minMass = weight;
        }
        if (weight > maxMass && !Number.isNaN(weight)) {
            maxMass = weight;
        }
        if (datum.getFullYear() == 1990) {
            dbYear++;
        }
        if (weight >= 10000) {
            dbMinMass++;
        }
    }
    avg = sum / data.length;
    var numbers = document.createElement('div');
    numbers.innerHTML = `Az összes meteorit összsúlya: ${sum} <br>
    A legkönyebb meteorit súlya: ${minMass} <br>
    A legnehezebb meteorit súlya: ${maxMass} <br>
    A meteoritok súlyának átlaga: ${avg} <br>
    Hány darab meteorit csapódott be 1990-ben: ${dbYear} db<br>
    Hány darab meteorit súlya legalább 10000: ${dbMinMass} db`;
    document.querySelector('body').appendChild(numbers);
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
}

getData('/js/meteorits.json', successAjax);

function table(data) {

    var kiir = '';

    for (var i = 0; i < data.length; i++) {
        date = new Date(data[i].year);
        kiir += `<tr>
             <td >${data[i].id}</td>
             <td >${Math.round(data[i].mass).toFixed(2)}</td>
             <td>${data[i].name}</td>
             <td>${data[i].nametype}</td>
             <td >${data[i].recclass}</td>
             <td>${data[i].reclat}</td>
             <td>${data[i].reclong}</td>
             <td>${date.getFullYear()}. 0${date.getMonth()+1}. 0${date.getDate()}</td>
             </tr>`;


    }
    document.querySelector('#main-table').innerHTML = kiir;
}

function rendez(sort) {

    db = db * -1;

    data.sort(function (a, b) {
        if (sort == 'id' || sort) {
            a[sort] = parseInt(a[sort]);
            b[sort] = parseInt(b[sort]);
        }
        if (a[sort] < b[sort]) {
            return db;
        } else {
            return -db;
        }

    });


}
/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/