import $ from 'jquery';
// import config from '../config';

export default class Uno {

    static login(user, accessToken, callback) {
        console.debug(user, "Uno fbLogin");
        Uno.api(`facebook/users/${user.user_id}/login?access_token=${accessToken}`, 'POST', user, callback);
    }

    static saveFBPage(page, callback) {
        Uno.api(`facebook/pages/`, 'POST', page, callback);
    }

    static api(endpoint, method, data, callback) {

        if (arguments.length === 2) {
            callback = method;
            method = 'get';
        } else if (arguments.length === 3) {
            callback = data;
            data = null;
        }
        console.log(endpoint, "API request");
        $.getJSON('config.json', function(response) {
            console.log(response, 'config');
            $.ajax({
                url: `${response.url}/${endpoint}`,
                type: method,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: callback,
                error: callback
            });
        });
    }
}
