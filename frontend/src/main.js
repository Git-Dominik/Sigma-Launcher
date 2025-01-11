import {GetLibrary} from '../wailsjs/go/main/App';

GetLibrary().then((ding) => {
    document.getElementById('tekst').innerHTML = ding;
});



setActiveItem();