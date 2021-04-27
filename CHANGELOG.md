# Changelog
All notable changes to this project will be documented in this file. 

## Unreleased
### Added
- Changelog
### Changed
- Moved feature tracking ("project management") from `README.md` to `CHANGELOG.md`
- Made placeholder text in character search form more definitive 
### Fixed
- Fixed `main` branch to allow cookies over insecure connection for dev purposes.

## feature-30 // YYYY-MM-DD
### Added
- Configure for deployment on Heroku.

## feature-29 // YYYY-MM-DD
### Added
- Connect to MongoDB Atlas.
- Configure session store in Mongo.
- Add search link to home page.
### Changed 
- Update comic series links. 

## feature-28 // YYYY-MM-DD
### Changed
- Team show page styles.

## feature-27 // YYYY-MM-DD
### Added
- Security
- Mongo injection
- Sanitize HTML in joi schemas
- Configure `helmet` and Content Security Policy.

## feature-26 // YYYY-MM-DD
### Fixed
- Fix styling bugs.

## feature-25 // YYYY-MM-DD
### Fixed
- Fix show character series results styling. 

## feature-24 // YYYY-MM-DD
### Added
- More content on search result cards.
- Functionality for "show character series".
### Changed
- Re-style home page. 
- Re-style login and register forms.

## feature-23 // YYYY-MM-DD
### Added
- Maps and Mapbox.

## feature-22 // YYYY-MM-DD
### Added
- Connect to Cloudinary.
- Image upload functionality.

## feature-21 // YYYY-MM-DD
### Added
- Configure environment variables.
### Changed
- Refactor code for Marvel API search.

## feature-20 // YYYY-MM-DD
### Added
- "Team" model 
- "Comments" model
### Removed
- "Hero" model 
- "Equipment" model

## feature-19 // YYYY-MM-DD
### Added
- Configure Marvel API. 

## feature-18 // YYYY-MM-DD
### Added
- Configure `router.route()` on route handlers. 
- Hide equipment from from non-logged in users. 
### Changed
- Refactor to controllers.

## feature-17 // YYYY-MM-DD
### Added
- Hide buttons based on user.
- Configure permissions for users.

## feature-16 // YYYY-MM-DD
### Added 
- More login functionality.
- `returnTo` original url functionality.
- Add `postAuthor` to Heroes.
### Changed
- Update models and re-seed.
- Update forms and home page.
### Fixed 
- Fix joi schemas.

## feature-15 // YYYY-MM-DD
### Added 
- Configure and enable auth. 
- Passport.js
- Create middlewares. 
- Configure navbar for Login/Logout.

## feature-14 // YYYY-MM-DD
### Changed
- Re-design flash messages. 
- Re-design edit and delete buttons. 
- Change navbar colors.

## feature-13 // YYYY-MM-DD
### Added
- Reorganize and add files to `.gitignore.`

## feature-12 // YYYY-MM-DD
### Added
- Second Mongo model
- Configure database relationship
- Configure post hook
### Changed
- Redesigned flash messages.

## feature-11 // YYYY-MM-DD
### Fixed
- UX/UI improvements.

## feature-10 // YYYY-MM-DD
### Added
- Express Session and Flash.

## feature-9 // YYYY-MM-DD
### Added
- Express Router
- ejs-mate
### Changed
- More refactoring
- Small design changes.

## feature-8 // YYYY-MM-DD
### Added
- Schema validations with joi.
- Basic error handling.
### Changed
- Refactoring

## feature-7 // YYYY-MM-DD
### Added
- Marvel / DC specific views.
- "Coming soon" landing page for "Play"

## feature-6 // YYYY-MM-DD
### Added
- Edit and delete routes + views.

## feature-5 // YYYY-MM-DD
### Added
- More RESTful routing on `index.js` and `views` files. 

## feature-4 // YYYY-MM-DD
### Added
- RESTful routes on `index.js`.
- Added content to `home.ejs`.
- Basic Bootstrap design with partials.

## feature-3 // YYYY-MM-DD
### Added
- Seed database with `seeds.js` file.
### Changed
- Update schema. 

## feature-2 // YYYY-MM-DD
### Added
- Initialize Mongoose Model file `hero.js`.
- Initial RESTful routing on `index.js`.

## feature-1 // YYYY-MM-DD
### Added
- Initialization with npm. 
- General project set up.





