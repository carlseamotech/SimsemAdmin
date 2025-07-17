I have now reviewed all the service files. I will now compare the endpoints defined in the Postman collection with the ones being used in the services.

Here's a summary of the findings:

### Unused Endpoints

The following endpoints from the Postman collection are not being used in the application:

- **Destinations**:
  - `GET /classes/Destination`
  - `GET /classes/DestinationDetails`
  - `GET /classes/TopCity`
  - `GET /classes/TopCityDetails`
- **Promo Code**:
  - `POST /classes/RedeemedPromoCode`
  - `GET /classes/RedeemedPromoCode`
- **Tourist**:
  - `POST /classes/Tourist`
  - `POST /users` (for tourist signup)
  - `PUT /classes/Tourist/:id`
  - `GET /classes/Tourist/:id`
  - `GET /classes/Tourist`
- **Local Host**:
  - `POST /classes/ServiceProviderPayment`
  - `POST /classes/ServiceProvider`
  - `POST /users` (for local host signup)
- **Book Experience**:
  - `POST /classes/ServiceRequest`
  - `PUT /classes/ServiceRequest/:id`

### Missing Endpoints

The following endpoints are being used in the application but are not documented in the Postman collection:

- **Experiences**:
  - `DELETE /classes/ProposedTour/:id` (implemented as a `PUT` to `isActive: false`)
- **Promo Code**:
  - `DELETE /classes/PromoCode/:id`
- **Teams**:
  - `POST /api/teams/invite`
