import { gql } from 'apollo-server';

const schema = `
type VAR {
    name: String!
    value: String
}

type KEY {
    channel: String!
    name: String!
}  

type HISTO {
    value: String
    timestamp: String!
}

type Query {
    checkPassword(password: String!): Boolean
    read(channel: String!, name: String!): VAR
    readHisto(channel: String!, name: String!, start: Int!, end: Int!): [HISTO]
}

type Mutation {
    write(channel: String!, name: String!, value: String, add_histo: Boolean, expiry: Int): KEY
    publish(channel: String!, name: String!, value: String): KEY
    publishWrite(channel: String!, name: String!, value: String, add_histo: Boolean, expiry: Int): KEY
}

type Subscription {
    subscribe(channel: String!, pattern: Boolean): VAR!
}
`;

console.log(schema);

export default gql(schema);
