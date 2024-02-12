## USER AUTHENTICATIION USING GRAPHQL

## Documentation
Endpoint: http://localhost:3000/graphql

## Sign Up

Endpoint: POST

Description: Create a new user

## Body graphql Query


mutation signup($input: LoginUserInput!) {
  signUp(loginUserInput: $input) {
     id
    username
    password
  }
}    

GraphQL Variables
json
{
  "input": {
    "username": "Ibrahim",
    "password": "octoib"
  }
}

## Sign In

## Documentation
Endpoint: http://localhost:3000/graphql

## Sign In

Endpoint: POST

Description: Authenticate user and generate access_token


## Body graphql Query

mutation signup($input: LoginUserInput!) {
  signUp(loginUserInput: $input) {
     id
    username
    password
  }
}   

## TESTING WITH POSTMAN 

1. OPEN THE LINK TO ACCESS THE ENDPOINT https://web.postman.co/workspace/My-Workspace~d9515388-eec3-4f42-890f-aeaf4a3b3ad2/collection/28702978-1c334d97-2a6f-46e8-9408-1900e777a539
2. UPDATE THE ENIRONMENT VARIABLES IN POSTMAN WITH YOUR LOCAL CONFIGURATION
3. TEST EACH ENDPOINT WITH THE PROVIDED REQUEST IN THE COLLECTION