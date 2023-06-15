This application serves as a valuable platform for individuals seeking coaches and stringers in their local area. With the surge in tennis enthusiasts during the COVID-19 pandemic and the closure of many tennis shops, this application fills a crucial need by connecting people with nearby coaches and stringers. 

The website features a user-friendly interface with a navigation bar on each page, consisting of three tabs: Apply, Start Your Journey, and Messages. The Apply tab provides options for individuals interested in becoming coaches or stringers. If someone wishes to apply as a coach, they can navigate to Apply -> Become a Coach, while those aspiring to become stringers can choose Apply -> Become a Stringer. These dedicated pages feature text fields prompting users to provide their phone number, city, state, bio, coaching experience, and set their rates.

Upon submitting their application, a button appears, allowing coaches and stringers to access their profile section. Here, they can conveniently edit or delete their prroile as needed. After applying, the coach or stringer's details will be displayed under Start Your Journey -> Find A Coach or Start Your Journey -> Find A Stringer, respectively. Users can search for a coach or stringer by specifying their state and city, ensuring they discover local professionals. The coaches and stringers are rated on a 5-star scale based on feedback from their clients.

To learn more about a specific coach or stringer, users can hover over their bio to view additional information. The website also facilitates direct messaging between users and professionals. Clicking the Contact button automatically sends an automatic message expressing interest in lessons or stringing services. Users can conveniently schedule a lesson directly with the coach through the website. Furthermore, clients have the opportunity to rate coaches or stringers on a 5-star scale after their initial lesson, providing valuable feedback.

Implementation:

Feature: Apply as a coach
We added a table in the database which stores each coach. Each entry in the table will be linked to a user of the website. There can only be one entry per user. If a user has not yet applied ot be a coach, then there will not be an entry in that table. The table also stores each of the coaches values such as rates, years of experience, etc.

Feauture: Coach Profile
If you already are a coach and you try to become a coach again then the website will suggest that you view your profile instead. This is a sepperate page where you can view, edit, or delete your profile. This was implemented with alot of vue and api calls. When a user decides to delete their coaching application then they will be redirected to the home page.

Feature: Find a Coach
The find a coach page was implemented using two search bars. This was implemented similarly to the video Professor posted on search bars. A user can filter on either a coach's state or city. The page will print them in no particular order. We also implemented a hover button which will show the coaches bio only when a user hovers over the button. A button also appears on each coach letting a user contact that coach. This is done as an api url is given to this page which allows you to send a message saying you are interested in coaching.V

Feature: Apply as a stringer
We added a table in the database which stores each stringer. Each entry in the table will be linked to a user of the website. There can only be one entry per user. If a user has not yet applied ot be a stringer, then there will not be an entry in that table. The table also stores each of the stringers values such as rates, years of experience, etc.

Feauture: Stringer Profile
If you already are a stringer and you try to become a stringer again then the website will suggest that you view your profile instead. This is a sepperate page where you can view, edit, or delete your profile. This was implemented with alot of vue and api calls. When a user decides to delete their stringing application then they will be redirected to the home page.

Feature: Find a Stringer
The find a stringer page was implemented using two search bars. This was implemented similarly to the video Professor posted on search bars. A user can filter on either a stringer's state or city. The page will print them in no particular order. We also implemented a hover button which will show the stringer's bio only when a user hovers over the button. A button also appears on each stringer letting a user contact that stringer. This is done as an api url is given to this page which allows you to send a message saying you are interested in stringing.

Feature: Messaging
The Messaging feature which lets any user on the website message eachother is implmented using a simple database table. This table holds every message on the website. Each entry contains who sent a message and whoe received it, the message itself, and when it was send. When a user loads the messaged pages, the server will query this table and find every user that you have messaged before and send all those mssasges back to the browser. From then on a user can pick one of those user to view the messages and send any to them.

Feature: Star Rating
The star rating system was implemented by following professor video. We made a star rating table which stores every ones rating of each other. Importantly a user is only able to rate another user when they are messaging that user. This enures that a user can not simply downvote every coach or stringer. The average of a coach's and stringer's rating will then be displayed when a user is finding a coach or stringer.
