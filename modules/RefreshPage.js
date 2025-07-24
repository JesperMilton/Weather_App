/**
 * Class for functionality of the pull-to-refresh feature.
 */
export default class RefreshPage {
    /**
 * Creates an instance of FetchAPI.
 * @returns {undefined}
 */
    constructor() {

        /**
         * @type {Element} - HTML element for the pullToRefresh container 
        */
        const pullToRefresh = document.querySelector('.pull-to-refresh');

        /**
         * @type {number} - Y-value 
        */
        let touchstartY = 0;

        /**
         * @listens document#touchstart - the namespace and  
        */
        document.addEventListener('touchstart', e => {
            touchstartY = e.touches[0].clientY;
        });
        document.addEventListener('touchmove', e => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchstartY;
            if (touchDiff > 0 && window.scrollY === 0) {
                pullToRefresh.classList.add('visible');
                e.preventDefault();
            }
        });
        document.addEventListener('touchend', e => {
            if (pullToRefresh.classList.contains('visible')) {
                pullToRefresh.classList.remove('visible');
                location.reload(true);
            }
        });
    }
}