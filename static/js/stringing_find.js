let app = {};

let init = (app) => {
    app.data = {
        state_q: "",
        city_q: "",
        stringers: []
    };

    app.enumerate = (a) => {
        let k = 0;
        a.map((e) => {
            e._idx = k++;
            e.showAbout = false; // Initialize the showAbout property for each coach
        });
        return a;
    };

    app.get_stringers = function () {
        axios.get(get_stringers_url, { params: { state_q: app.vue.state_q, city_q: app.vue.city_q } })
            .then(function (response) {
                app.vue.stringers = app.enumerate(response.data.stringers);
            });
    };

    app.toggleAbout = function (stringer) {
        stringer.showAbout = !stringer.showAbout; // Toggle the showAbout property
    };

    app.methods = {
        get_stringers: app.get_stringers,
        toggleAbout: app.toggleAbout
    };

    app.vue = new Vue({
        el: '#vue-target',
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        app.get_stringers();
    };

    app.init();
};

init(app);
