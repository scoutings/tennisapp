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

    app.set_edit_coach = function () {
        app.vue.is_editting = true;
    }

    app.edit_coach = function () {
        axios.post(edit_coach_url, {
            phone_number: app.vue.coach_info['phone_num_coach'],
            state: app.vue.coach_info['state_coach'],
            city: app.vue.coach_info['city_coach'],
            about: app.vue.coach_info['about_coach'],
            experience: app.vue.coach_info['experience_coach'],
            private_rate: app.vue.coach_info['private_rate_coach'],
            semi_private_rate: app.vue.coach_info['semi_private_rate_coach'],
            group_rate: app.vue.coach_info['group_rate_coach'],
            hitting_rate: app.vue.coach_info['hitting_rate_coach']
        }).then(function (response) {
            app.vue.is_editting = false;
        }).catch(function (error) {
            console.log(error);
        })
    }

    app.done_edit_coach = function () {
        app.vue.is_editting = false;
        app.get_coach_info();
    }

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        set_edit: app.set_edit_coach,
        done_edit: app.done_edit_coach,
        edit: app.edit_coach
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
