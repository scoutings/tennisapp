// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        is_editting: false,
        coach_info: null
    };

    app.get_coach_info = function () {
        axios.get(get_coach_info_url)
            .then(function (response) {
                app.vue.coach_info = response.data.coach;
            });
    }

    app.edit_coach = function () {
        app.vue.is_editting = true;
    }

    app.done_edit_coach = function () {
        app.vue.is_editting = false;
        app.get_coach_info();
    }

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        edit: app.edit_coach,
        done_edit: app.done_edit_coach
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
        app.get_coach_info();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
