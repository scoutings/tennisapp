let app = {};

let init = (app) => {
    app.data = {
        state_q: "",
        city_q: "",
        coaches: []
    };

    app.enumerate = (a) => {
        let k = 0;
        a.map((e) => {
            e._idx = k++;
            e.showAbout = false; // Initialize the showAbout property for each coach
        });
        return a;
    };

    app.get_coaches = function () {
        axios.get(get_coaches_url, { params: { state_q: app.vue.state_q, city_q: app.vue.city_q } })
            .then(function (response) {
                app.vue.coaches = app.enumerate(response.data.coaches);
            });
    };

    app.toggleAbout = function (coach) {
        coach.showAbout = !coach.showAbout; // Toggle the showAbout property
    };

    app.send_message = function (row_id) {
        axios.post(send_message_url, {
            to: app.vue.coaches[row_id]['auth_user']['id'],
            message: "I am interested in coaching!"
        });
    };

    app.methods = {
        get_coaches: app.get_coaches,
        toggleAbout: app.toggleAbout,
        send: app.send_message
    };

    app.vue = new Vue({
        el: '#vue-target',
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        app.get_coaches();
    };

    app.init();
};

init(app);
