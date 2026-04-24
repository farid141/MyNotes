GraphQL (Query Language)

merupakan sebuah API yang memiliki flexibilitas lebih tinggi dari REST. 

Dokumentasi bisa akses di graphql.com, berisi library graphql untuk berbagai bahasa pemrograman.

dari client, kita dapat mengatur get untuk field apa saja untuk satu end-point. 

Kalau REST, harus bikin end-point baru dan front-end harus juga tahu field apa saja yang dikembalikan endpoint baru tersebut.

semuanya dilakukan dalam [POST]: /graphql.
memiliki struktur body:
{
	<OperationType1>: {
		<OperationEndpoint>: {
			requested fields1,
			requested fields2,
		}
	},
}


Operation Type:
- query (GET)
- mutation (manipulate data (POST, PUT, PATCH, DELETE))
- subscription (Websocket)

Penggunaan

Dalam program, kita perlu mendefinisikan type dan resolver:
- type berisi list OperationEndpoint dan payloadnya
- resolver berisi OperationEndpoint fungsi callback berisi payloadnya sebagai parameter


buat skema dengan gql tag
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';

// Define schema
const typeDefs = gql`

  input userInput {
    
  }
  
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, TypeScript with GraphQL!',
  },
	mutation: {
		updateUser: {
			requested fields1,
			requested fields2,
		},
		deleteUser: {
			requested fields1,
		},
	}
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


mendefinisikan skema dengan typescript
```typescript
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';

@ObjectType()
class HelloResponse {
  @Field()
  message: string;
}

@Resolver()
class HelloResolver {
  @Query(() => HelloResponse)
  hello(): HelloResponse {
    return { message: 'Hello, TypeGraphQL!' };
  }
}

async function startServer() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startServer();
```
