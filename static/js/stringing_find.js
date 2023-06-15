let app = {};

let init = (app) => {
    app.data = {
        state_q: "",
        city_q: "",
        stringers: [],
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

    app.get_stringers = function () {
        axios.get(get_stringers_url, { params: { state_q: app.vue.state_q, city_q: app.vue.city_q } })
            .then(function (response) {
                app.vue.stringers = app.enumerate(response.data.stringers);
                for (let s of app.vue.stringers) {
                    axios.get(get_avg_rating_url, {params: {receiver: s.auth_user.id} })
                        .then(function (result) {
                            s.rating = result.data.rating;
                        });
                };
            });
    };

    app.toggleAbout = function (stringer) {
        stringer.showAbout = !stringer.showAbout; // Toggle the showAbout property
    };

    app.send_message = function (row_id) {
        axios.post(send_message_url, {
            to: app.vue.stringers[row_id]['auth_user']['id'],
            message: "I am interested in stringing!"
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
        get_stringers: app.get_stringers,
        toggleAbout: app.toggleAbout,
        send: app.send_message
    };

    app.vue = new Vue({
        el: '#vue-target',
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        app.get_stringers();
        app.set_self_id();
    };

    app.init();
};

init(app);
