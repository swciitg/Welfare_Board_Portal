Requests arrive via defined routes in the routes/ folder.

The router directs requests to the matching controller located in the controllers/ folder.

Controllers interact with database models in the models/ folder to fetch, create, update, or delete data.

For authenticated/admin actions, middleware in the controllers or via configuration ensures only authorized roles can perform certain actions.

Views are rendered using EJS templates in the views/ folder for server-side rendered login and index pages.