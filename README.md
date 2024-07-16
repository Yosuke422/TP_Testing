# TP Testing Salle de Sport

This project is a gym reservation system with features for member registration, gym selection, machine selection, and reservation confirmation. The system includes unit tests, integration tests, and system tests using Jest and Selenium WebDriver.

## Project Structure

```plaintext
tp_testing_salledesport/
├── src/
│   ├── controllers/
│   │   ├── memberController.js
│   │   └── reservationController.js
│   ├── models/
│   │   ├── member.js
│   │   └── reservation.js
│   ├── views/
│   │   ├── memberRegistration.html
│   │   ├── gymSelection.html
│   │   ├── machineSelection.ejs
│   │   └── reservationConfirmation.html
│   ├── app.js
│   └── routes.js
├── tests/
│   ├── unit/
│   │   ├── member.test.js
│   │   └── reservation.test.js
│   ├── integration/
│   │   ├── memberIntegration.test.js
│   │   └── reservationIntegration.test.js
│   └── system/
│       ├── memberSystem.test.js
│       └── reservationSystem.test.js
├── package.json
└── README.md
```
## Prerequisites

Make sure you have Node.js and npm installed. You can download Node.js from [here](https://nodejs.org/).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd tp_testing_salledesport
Install the dependencies:
```bash
npm install
```
Running the Server
To start the server, run:

```bash
npm start
```
The server will be running on http://localhost:3000.
Running the Tests
Unit Tests
Unit tests are used to test individual functions. To run the unit tests, use the following command:

```bash
npm run test:unit
```
Integration Tests
Integration tests are used to test the interactions between different parts of the system. To run the integration tests, use the following command:

```bash
npm run test:integration
```
System Tests
System tests (end-to-end tests) are used to test the entire application flow. To run the system tests, use the following command:

```bash
npm run test:system
```
## Explanation of Tests

### Unit Tests
- **member.test.js**: Tests the functions related to member validation.
- **reservation.test.js**: Tests the functions related to reservation validation.

### Integration Tests
- **memberIntegration.test.js**: Tests the member registration process and saving to the database.
- **reservationIntegration.test.js**: Tests the reservation creation process and association with members.

### System Tests
- **memberSystem.test.js**: Automates the member registration process via the form.
- **reservationSystem.test.js**: Automates the complete reservation process, from member registration to reservation confirmation.
