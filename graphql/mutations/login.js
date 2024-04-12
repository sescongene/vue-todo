export default gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        email_verified_at
        created_at
        updated_at
      }
    }
  }
`;
