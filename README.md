# address-book

Execute following command to run the server on your local.
`npm run startDev`


Here are the curl requests


```
Create user.

curl --location 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Manoj V Patel",
    "email": "mv.patel@gmails.com",
    "city": "Surat",
    "phoneNumber": ["890-009-0909", "909-101-4000"]
}'

{
    "name": "Manoj V Patel",
    "email": "mv.patel@gmails.com",
    "city": "Surat",
    "phoneNumber": [
        "890-009-0909",
        "909-101-4000"
    ],
    "id": "user_3182d853-c002-461d-af20-94978f6a2a56"
}

____________________________________________________________

Get all users.
curl --location 'localhost:3000/users'

[
 {
     "name": "Manoj V Patel",
     "email": "mv.patel@gmails.com",
     "city": "Surat",
     "phoneNumber": [
         "890-009-0909",
         "909-101-4000"
     ],
     "id": "user_6453a5a8-6ac0-4b66-9e19-ee1b02ba0d81"
 },
 {
     "name": "Anokhi S Shah",
     "email": "anokhi.spl@shah-pvt-ltd.com",
     "city": "Hyderabad",
     "phoneNumber": [
         "909-009-1111"
     ],
     "id": "user_6f2e328d-b5c4-4978-9d0b-031131ce1f35"
 }
]

_______________________________________________________________

Update user. Send the fields that are required to be updated.

curl --location --request PUT 'localhost:3000/users/user_6453a5a8-6ac0-4b66-9e19-ee1b02ba0d81' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Pritesh Paul",
    "city": "Ahmedabad"
}'

{
 "name": "Pritesh Paul",
 "email": "mv.patel@gmails.com",
 "city": "Ahmedabad",
 "phoneNumber": [
     "890-009-0909",
     "909-101-4000"
 ],
 "id": "user_6453a5a8-6ac0-4b66-9e19-ee1b02ba0d81"
}


_______________________________________________________________

Delete user. 

curl --location --request DELETE 'localhost:3000/users/user_6453a5a8-6ac0-4b66-9e19-ee1b02ba0d81'

{
 "name": "Pritesh Paul",
 "email": "mv.patel@gmails.com",
 "city": "Ahmedabad",
 "phoneNumber": [
     "890-009-0909",
     "909-101-4000"
 ],
 "id": "user_6453a5a8-6ac0-4b66-9e19-ee1b02ba0d81"
}

```
