const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "tweeter_react",
});

pool.connect;

module.exports = {
  getTweeter: function () {
    return pool
      .query(
        `
    SELECT users.*, tweets.tweet_text, tweets.date_posted, tweets.likes, tweets.retweets
    FROM users
    JOIN tweets ON tweets.user_id = users.id;

    `
      )
      .then((data) => {
        return data.rows;
      });
  },

  /// Users

  /**
   * Get a single user from the database given their email.
   * @param {String} email The email of the user.
   * @return {Promise<{}>} A promise to the user.
   */

  getUserWithEmail: function (email) {
    return pool
      .query(
        `
  SELECT *
  FROM users
  WHERE email LIKE $1;
  `,
        [email]
      )
      .then((res) => {
        return Promise.resolve(res.rows[0]);
      });
  },

  /**
   * Get a single user from the database given their id.
   * @param {string} id The id of the user.
   * @return {Promise<{}>} A promise to the user.
   */
  getUserWithId: function (id) {
    return pool
      .query(
        `
  SELECT *
  FROM users
  WHERE id = $1;
  `,
        [id]
      )
      .then((res) => {
        console.log(res);
        return Promise.resolve(res.rows[0]);
      });
  },

  /**
   * Add a new user to the database.
   * @param {{name: string, password: string, email: string}} user
   * @return {Promise<{}>} A promise to the user.
   */
  addUser: function (user) {
    const dataArray = [user.name, user.email, user.password];
    return pool
      .query(
        `
    INSERT INTO users (name, email, password)
    VALUES($1, $2, $3)
    RETURNING *;
  `,
        dataArray
      )
      .then((res) => {
        Promise.resolve(res.rows);
      });
  },

  /**
   * Get all reservations for a single user.
   * @param {string} guest_id The id of the user.
   * @return {Promise<[{}]>} A promise to the reservations.
   */
  getAllReservations: function (guest_id, limit = 10) {
    return pool
      .query(
        `
  SELECT reservations.*, properties.*
  FROM reservations
  JOIN properties on properties.id = reservations.property_id
  JOIN users ON users.id = reservations.guest_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id;
  `,
        [guest_id]
      )
      .then((res) => {
        return Promise.resolve(res.rows);
      });
  },

  /// Properties

  /**
   * Get all properties.
   * @param {{}} options An object containing query options.
   * @param {*} limit The number of results to return.
   * @return The returned properties from SQL db
   */
  getAllProperties: function (options, limit = 10) {
    const queryParams = [];

    let queryString = `
  SELECT properties.*, avg(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

    // Check for options

    if (options) {
      queryString += `WHERE `;
    }

    // Check for city

    if (options.city) {
      queryParams.push(options.city);
      queryString += `city LIKE $${queryParams.length} AND `;
    }

    // Check for owner_id

    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString += `city LIKE $${queryParams.length} AND `;
    }

    // Check for max price per night

    if (options.maximum_price_per_night) {
      queryParams.push(options.maximum_price_per_night);
      queryString += `cost_per_night < $${queryParams.length} AND `;
    }

    // Check for min price per night

    if (options.minimum_price_per_night) {
      queryParams.push(options.minimum_price_per_night);
      queryString += `cost_per_night >= $${queryParams.length} AND `;
    }

    // Check for minimum rating

    if (options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      queryString += `rating >= $${queryParams.length} AND `;
    }

    // Remove the trailing AND from the query
    queryString = queryString.substring(0, queryString.length - 4);

    // Add the limit parameter and final touches to SQL query
    queryParams.push(limit);
    queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

    return pool.query(queryString, queryParams).then((res) => res.rows);
  },

  /**
   * Add a property to the database
   * @param {{}} property An object containing all of the property details.
   * @return The newly added property.
   */
  addProperty: function (property) {
    console.log(property);
    const queryParams = [];

    let attributesString = `(`;

    let insertString = `INSERT INTO properties `;
    let queryString = `VALUES(`;

    // Check for title

    if (property.title) {
      queryParams.push(property.title);
      queryString += `$${queryParams.length}, `;
      attributesString += "title, ";
    }

    // Check for description

    if (property.description) {
      queryParams.push(property.description);
      queryString += `$${queryParams.length}, `;
      attributesString += "description, ";
    }

    // Check for number_of_bedrooms

    if (property.number_of_bedrooms) {
      queryParams.push(property.number_of_bedrooms);
      queryString += `$${queryParams.length}, `;
      attributesString += "number_of_bedrooms, ";
    }

    // Check for number_of_bathrooms

    if (property.number_of_bathrooms) {
      queryParams.push(property.number_of_bathrooms);
      queryString += `$${queryParams.length}, `;
      attributesString += "number_of_bathrooms, ";
    }

    // Check for parking_spaces

    if (property.parking_spaces) {
      queryParams.push(property.parking_spaces);
      queryString += `$${queryParams.length}, `;
      attributesString += "parking_spaces, ";
    }

    // Check for cost_per_night
    if (property.cost_per_night) {
      queryParams.push(property.cost_per_night);
      queryString += `$${queryParams.length}, `;
      attributesString += "cost_per_night, ";
    }

    // Check for thumbnail_photo_url
    if (property.thumbnail_photo_url) {
      queryParams.push(property.thumbnail_photo_url);
      queryString += `$${queryParams.length}, `;
      attributesString += "thumbnail_photo_url, ";
    }

    // Check for cover photo
    if (property.cover_photo_url) {
      queryParams.push(property.cover_photo_url);
      queryString += `$${queryParams.length}, `;
      attributesString += "cover_photo_url, ";
    }

    // Check for street
    if (property.street) {
      queryParams.push(property.street);
      queryString += `$${queryParams.length}, `;
      attributesString += "street, ";
    }

    // Check for country
    if (property.country) {
      queryParams.push(property.country);
      queryString += `$${queryParams.length}, `;
      attributesString += "country, ";
    }

    // Check for city
    if (property.city) {
      queryParams.push(property.city);
      queryString += `$${queryParams.length}, `;
      attributesString += "city, ";
    }
    // Check for province
    if (property.province) {
      queryParams.push(property.province);
      queryString += `$${queryParams.length}, `;
      attributesString += "province, ";
    }

    // Check for postal code
    if (property.post_code) {
      queryParams.push(property.post_code);
      queryString += `$${queryParams.length}, `;
      attributesString += "post_code, ";
    }

    // Check for owner_id
    if (property.owner_id) {
      queryParams.push(property.owner_id);
      queryString += `$${queryParams.length}, `;
      attributesString += "owner_id, ";
    }

    // Remove the trailing comma from values
    queryString = queryString.substring(0, queryString.length - 2);

    // Remove the trailing comma from attributes
    attributesString = attributesString.substring(
      0,
      attributesString.length - 2
    );

    // Closing brackets to queryString and attributeString
    queryString += `) `;
    attributesString += ") ";

    console.log(attributesString, queryString);

    let concatString = insertString + attributesString + queryString;
    concatString += `RETURNING *;`;

    return pool.query(concatString, queryParams).then((res) => res.rows);
  },

  addReservation: function (reservation) {
    const queryParams = [];

    queryParams.push(reservation.guest_id);
    queryParams.push(reservation.property_id);
    queryParams.push(reservation.start_date);
    queryParams.push(reservation.end_date);

    let queryString = `
      INSERT INTO reservations (guest_id, property_id, start_date, end_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    return pool.query(queryString, queryParams).then((res) => res.rows);
  },
};
