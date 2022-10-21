const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
} = require('graphql');

const DocumentType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a document',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID)},
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        allowedUsers: { type: new GraphQLList(GraphQLString) },
        editor: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = DocumentType;
