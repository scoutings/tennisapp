// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {
    
    // This is the Vue data.
    app.data = {
        state_q: "",
        city_q: "",
	coaches: []
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    app.get_coaches = function () {
        axios.get(get_coaches_url, {params: {state_q: app.vue.state_q, city_q: app.vue.city_q}})
            .then(function (response) {
                app.vue.coaches = app.enumerate(response.data.coaches);
            });
    };

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        get_coaches: app.get_coaches
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
        app.get_coaches();
    };

    // Call to the initializer
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
