let app = {};

let init = (app) => {
    app.data = {
        state_q: "",
        city_q: "",
        coaches: [],
        self_id: 0
    };

    app.enumerate = (a) => {
        let k = 0;
        a.map((e) => {
            e._idx = k++;
            e.showAbout = false; // Initialize the showAbout property for each coach
            e.rating = 0;
        });
        return a;
    };

    app.get_coaches = function () {
        axios.get(get_coaches_url, { params: { state_q: app.vue.state_q, city_q: app.vue.city_q } })
            .then(function (response) {
                app.vue.coaches = app.enumerate(response.data.coaches);
                for (let c of app.vue.coaches) {
                    axios.get(get_avg_rating_url, {params: {receiver: c.auth_user.id} })
                        .then(function (result) {
                            c.rating = result.data.rating;
                        });
                };
            });
    };

    app.toggleAbout = function (coach) {
        coach.showAbout = !coach.showAbout; // Toggle the showAbout property
    };

    app.send_message = function (row_id) {
        axios.post(send_message_url, {
            to: app.vue.coaches[row_id]['auth_user']['id'],
            message: "I am interested in tennis lessons"
        }).then(function () {
            axios.get(redirect_messages_url)
                .then(function (r) {
                    window.location = r.data.url;
                });
        });
    };

    app.set_self_id = function () {
        axios.get(get_self_id_url)
            .then(function (r) {
                app.vue.self_id = r.data.uid;
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
        app.set_self_id();
    };

    app.init();
};

init(app);
