// keycloakAdapter.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User"); // Assurez-vous d'importer votre modèle utilisateur
const qs = require('qs');
async function getKeycloakToken(email,password){
    try {
      const response = await axios.post(
        'http://localhost:8080/realms/StationSki/protocol/openid-connect/token',
        qs.stringify({
            client_id: 'APIGateway',
            client_secret: 'QOYUSXn21bYLRtReeMWbW2z5Mt9R7UvG',
            username: email,
            password: password,
            grant_type: 'password'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Unable to obtain Keycloak token');
    }
  };

const verifyJwtToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const foundUser = await User.findOne({ where: { id: decoded.UserInfo.id } });
        if (!foundUser) {
            throw new Error("User not found");
        }
        return foundUser;
    } catch (error) {
        console.error("JWT verification error:", error);
        throw new Error("Invalid JWT token");
    }
};

module.exports = { getKeycloakToken, verifyJwtToken };
