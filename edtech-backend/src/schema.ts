import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    enrollments: [Enrollment!]!
  }

  type Course {
    id: Int!
    title: String!
    description: String!
    level: String!
    enrollments: [Enrollment!]!
  }

  type Enrollment {
    id: Int!
    user: User!
    course: Course!
    role: String!
  }

  type Query {
    getAllCourses: [Course!]!
    getCourseById(id: Int!): Course
    getUserEnrollments(userId: Int!): [Enrollment!]!
  }

  type Mutation {
    enrollUser(userId: Int!, courseId: Int!, role: String!): Enrollment!
    updateCourse(id: Int!, title: String!, description: String!, level: String!): Course!
    deleteCourse(id: Int!): Course!
  }
`;
