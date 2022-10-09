const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} = require('graphql');

const DocumentType = require("./document");
const document = require("../models/documentFacade")
const {GraphQLString} = require("graphql/type");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        docs: {
            type: new GraphQLList(DocumentType),
            description: "All documents accessible by email",
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                return await document.getDocs(args.email);
            }
        },
        document: {
            type: DocumentType,
            description: 'A single document',
            args: {
                _id: { type: GraphQLID }
            },
            resolve: async function(parent, args) {
                return await document.openDoc(args._id);
            }
        },
    })
});

module.exports = RootQueryType;
