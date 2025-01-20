**Nearby Locations API**


The Nearby Locations API is a Node.js application that provides endpoints to retrieve locations by category, search for nearby locations within a specified radius, and calculate trip costs between two points. It utilizes Express for routing, Sequelize as the ORM, PostgreSQL for the database, and Docker for containerization.
Features
* Get Locations by Category: Fetches all locations belonging to a specific category.
* Search Nearby Locations: Finds locations within a certain radius from a given latitude and longitude.
* Calculate Trip Cost: Estimates the trip cost between two points, integrating with the TollGuru API for toll and fuel cost calculations.
Prerequisites
* Docker and Docker Compose installed on your system.
* A Docker Hub account for pushing images.
Getting Started
1. Clone the Repository: bash CopyEdit   git clone https://github.com/yourusername/nearby-locations-api.git
2. cd nearby-locations-api
3.   
4. Set Up Environment Variables: Create a .env file in the root directory with the following content: env CopyEdit   DB_USER=your_db_user
5. DB_PASSWORD=your_db_password
6. DB_NAME=your_db_name
7. DB_HOST=db
8. DB_PORT=5432
9. TOLLGURU_API_KEY=your_tollguru_api_key
10.   
11. Build and Run the Application with Docker Compose: bash CopyEdit   docker-compose up --build
12.    This command will build the Docker images and start the services defined in the docker-compose.yml file.
13. Push the Docker Image to Docker Hub: bash CopyEdit   # Log in to Docker Hub
14. docker login -u your_dockerhub_username
15. 
16. # Tag the image
17. docker tag nearby-locations-api-api:latest your_dockerhub_username/nearby-locations:latest
18. 
19. # Push the image
20. docker push your_dockerhub_username/nearby-locations:latest
21.   
API Endpoints
* GET /locations/:category: Retrieve locations by category.
* POST /search: Search for nearby locations within a specified radius.
* POST /trip-cost/:location_id: Calculate the trip cost to a specific location.
Technologies Used
* Node.js: JavaScript runtime environment.
* Express: Web framework for Node.js.
* Sequelize: Promise-based Node.js ORM for PostgreSQL.
* PostgreSQL: Relational database system.
* Docker: Containerization platform.
