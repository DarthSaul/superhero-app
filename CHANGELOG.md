# Changelog
All notable changes to this project will be documented in this file. 

## Unreleased
### Added


## feature-31 // 2021-04-26
### Added
- Changelog
### Changed
- Moved feature tracking ("project management") from `README.md` to `CHANGELOG.md`
- Made placeholder text in character search form more definitive 
### Fixed
- Fixed `main` branch to allow cookies over insecure connection for dev purposes.

## feature-30 // 2021-04-01
### Added
- Configure for deployment on Heroku.

## feature-29 // 2021-04-01
### Added
- Connect to MongoDB Atlas.
- Configure session store in Mongo.
- Add search link to home page.
### Changed 
- Update comic series links. 

## feature-28 // 2021-04-01
### Changed
- Team show page styles.

## feature-27 // 2021-03-31
### Added
- Security
- Mongo injection
- Sanitize HTML in joi schemas
- Configure `helmet` and Content Security Policy.

## feature-26 // 2021-03-31
### Fixed
- Fix styling bugs.

## feature-25 // 2021-03-31
### Fixed
- Fix show character series results styling. 

## feature-24 // 2021-03-31
### Added
- More content on search result cards.
- Functionality for "show character series".
### Changed
- Re-style home page. 
- Re-style login and register forms.

## feature-23 // 2021-03-30
### Added
- Maps and Mapbox.

## feature-22 // 2021-03-30
### Added
- Connect to Cloudinary.
- Image upload functionality.

## feature-21 // 2021-03-30
### Added
- Configure environment variables.
### Changed
- Refactor code for Marvel API search.

## feature-20 // 2021-03-29
### Added
- "Team" model 
- "Comments" model
### Removed
- "Hero" model 
- "Equipment" model

## feature-19 // 2021-03-29
### Added
- Configure Marvel API. 

## feature-18 // 2021-03-18
### Added
- Configure `router.route()` on route handlers. 
- Hide equipment from from non-logged in users. 
### Changed
- Refactor to controllers.

## feature-17 // 2021-03-18
### Added
- Hide buttons based on user.
- Configure permissions for users.

## feature-16 // 2021-03-18
### Added 
- More login functionality.
- `returnTo` original url functionality.
- Add `postAuthor` to Heroes.
### Changed
- Update models and re-seed.
- Update forms and home page.
### Fixed 
- Fix joi schemas.

## feature-15 // 2021-03-18
### Added 
- Configure and enable auth. 
- Passport.js
- Create middlewares. 
- Configure navbar for Login/Logout.

## feature-14 // 2021-03-18
### Changed
- Re-design flash messages. 
- Re-design edit and delete buttons. 
- Change navbar colors.

## feature-13 // 2021-03-10
### Added
- Reorganize and add files to `.gitignore.`

## feature-12 // 2021-03-09
### Added
- Second Mongo model
- Configure database relationship
- Configure post hook
### Changed
- Redesigned flash messages.

## feature-11 // 2021-03-09
### Fixed
- UX/UI improvements.

## feature-10 // 2021-03-09
### Added
- Express Session and Flash.

## feature-9 // 2021-03-08
### Added
- Express Router
- ejs-mate
### Changed
- More refactoring
- Small design changes.

## feature-8 // 2021-03-08
### Added
- Schema validations with joi.
- Basic error handling.
### Changed
- Refactoring

## feature-7 // 2021-02-15
### Added
- Marvel / DC specific views.
- "Coming soon" landing page for "Play"

## feature-6 // 2021-02-15
### Added
- Edit and delete routes + views.

## feature-5 // 2021-02-14
### Added
- More RESTful routing on `index.js` and `views` files. 

## feature-4 // 2021-02-14
### Added
- RESTful routes on `index.js`.
- Added content to `home.ejs`.
- Basic Bootstrap design with partials.

## feature-3 // 2021-02-14
### Added
- Seed database with `seeds.js` file.
### Changed
- Update schema. 

## feature-2 // 2021-02-14
### Added
- Initialize Mongoose Model file `hero.js`.
- Initial RESTful routing on `index.js`.

## feature-1 // 2021-02-14
### Added
- Initialization with npm. 
- General project set up.





