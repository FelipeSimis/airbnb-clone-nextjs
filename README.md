# Airbnb Clone Next.js

This is a full-stack web application that replicates the functionality of Airbnb, built using Next.js, Tailwind CSS, and various other technologies.

![Initial page](../assets/screenshots/demo.png)

## Features

- User authentication with email and password
- OAuth authentication with Google and GitHub
- Styling with Tailwind CSS
- Image uploading with Cloudinary
- Map integration with Leaflet
- Data validation with Zod
- Database storage with Prisma and MongoDB

The application provides the following functionalities:

- **User Listings:** Logged-in users can create listings for their properties, including property details, images, and availability.
- **Property Reservations:** Users can book reservations for properties created by other users.
- **User Dashboard:** Users can view a list of their own properties, favourited listings, reservations made on their properties, and a list of their past and upcoming trips.
- **Responsive Design:** The application is fully responsive and optimized for various screen sizes.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (Make sure you have a MongoDB instance running locally or provide a remote connection URL)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/FelipeSimis/airbnb-clone-nextjs.git
   ```

2. Install dependencies:

   ```bash
   cd airbnb-clone-nextjs
   yarn
   ```

3. Set up environment variables:

   - Create a `.env` file in the project root.
   - Define the required environment variables in the `.env` file. Here's an example:

     ```
     DATABASE_URL=your-mongodb-connection-url

     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-id

     GITHUB_ID=your-github-client-id
     GITHUB_SECRET=your-github-client-secret

     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name

     NEXTAUTH_SECRET=your-nextauth-secret
     ```

4. Run the development server:

   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was built using various open-source libraries, frameworks, and APIs. Special thanks to the developers and contributors of the following technologies:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next Auth](https://next-auth.js.org/)
- [Next Cloudinary](https://next-cloudinary.spacejelly.dev/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Zustand](https://github.com/pmndrs/zustand)

## Demo

[Live Demo](https://stay-hub.vercel.app)
