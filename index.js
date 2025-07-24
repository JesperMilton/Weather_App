import App from "./modules/App.js";
import RefreshPage from "./modules/RefreshPage.js";

var main = () => {

    if ('serviceWorker' in navigator) { 
        const sw = navigator.serviceWorker;
        sw.register("/sw.js");
    }
 
    var weatherApp = new App();
    weatherApp.start();

    new RefreshPage();
}
main();

