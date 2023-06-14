// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        is_editting: false,
        stringer_info: null
    };

    app.get_stringer_info = function () {
        axios.get(get_stringer_info_url)
            .then(function (response) {
                app.vue.stringer_info = response.data.stringer;
            });
    };

    app.set_edit_stringer = function () {
        app.vue.is_editting = true;
    };

    app.edit_stringer = function () {
        axios.post(edit_stringer_url, {
            phone_number: app.vue.stringer_info['phone_num_stringer'],
            state: app.vue.stringer_info['state_stringer'],
            city: app.vue.stringer_info['city_stringer'],
            about: app.vue.stringer_info['about_stringer'],
            experience: app.vue.stringer_info['experience_stringer'],
            price: app.vue.stringer_info['price_stringer'],
            turnover: app.vue.stringer_info['turnover_stringer']
        }).then(function (response) {
            app.vue.is_editting = false;
        }).catch(function (error) {
            console.log(error);
        })
    };

    app.done_edit_stringer = function () {
        app.vue.is_editting = false;
        app.get_stringer_info();
    };

    app.del_stringer = function () {
        axios.post(del_stringer_url)
            .then(function () {
                axios.get(redirect_home_url)
                    .then(function (r) {
                        window.location = r.data.url;
                    });
            });
    };

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        set_edit: app.set_edit_stringer,
        done_edit: app.done_edit_stringer,
        edit: app.edit_stringer,
        del: app.del_stringer
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: '#vue-target',
        data: app.data,
        methods: app.methods
    });

    // And this initializes it.
    app.init = () => {
        // Put here any initialization code.
        // Typically this is a server GET call to load the data.
        app.get_stringer_info();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
