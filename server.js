const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');

// Verileri data.json dosyasından okuyun
const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData);

const typeDefs = gql`
  type User {
    id: String
    user: String
    age: Int
    city: String
    number: Int
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  type Mutation {
    addUser(user: String, age: Int, city: String, number: Int): User
    updateUser(id: String, user: String, age: Int, city: String, number: Int): User
    deleteUser(id: String): User
  }
`;

const resolvers = {
  Query: {
    users: () => data.users,
    user: (parent, args) => data.users.find((user) => user.id === args.id),
  },
  Mutation: {
    addUser: (parent, args) => {
		const newUser = { ...args, id: String(data.users.length + 1) };
		data.users.push(newUser);
		fs.writeFileSync('data.json', JSON.stringify(data));
		return newUser;
	  },
    updateUser: (parent, args) => {
    const userIndex = data.users.findIndex((user) => user.id === args.id);
    if (userIndex !== -1) {
      data.users[userIndex] = { ...data.users[userIndex], ...args };
      fs.writeFileSync('data.json', JSON.stringify(data));
      return data.users[userIndex];
    }
    return null;
      },
    deleteUser: (parent, args) => {
		const userIndex = data.users.findIndex((user) => user.id === args.id);
		if (userIndex !== -1) {
		  const deletedUser = data.users.splice(userIndex, 1)[0];
		  fs.writeFileSync('data.json', JSON.stringify(data));
		  return deletedUser;
		}
		return null;
	  },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Apollo Server at http://localhost:4000${server.graphqlPath}`);
  });
});
