
# cinemaManager


GET
http://localhost:3000/api/halls
http://localhost:3000/api/halls
Retrieves list of all cinema halls

POST
http://localhost:3000/api/halls
http://localhost:3000/api/halls
Saves a new hall. Needs to specify value for key 'name' in the request body.

Bodyurlencoded
name
hall2
GET
http://localhost:3000/api/hall/5fca38af9fe6c808e2cd4e77
http://localhost:3000/api/hall/5fca38af9fe6c808e2cd4e77
Saves a new screening for a hall specified with hall id. Needs to specify values for keys 'film', 'beginning' and 'end' in the request body.

PUT
http://localhost:3000/api/hall/5fcb513a764c6e02f46bc3f0
http://localhost:3000/api/hall/5fcb513a764c6e02f46bc3f0
Updates a hall specified with hall id. Needs to specify value for key 'name' in the request body.

Bodyurlencoded
name
hall2
DEL
http://localhost:3000/api/hall/5fcb5111764c6e02f46bc3ef
http://localhost:3000/api/hall/5fcb5111764c6e02f46bc3ef
Deletes hall specified with hall id.

GET
http://localhost:3000/api/screenings/5fca38af9fe6c808e2cd4e77
http://localhost:3000/api/screenings/5fca38af9fe6c808e2cd4e77
Retrieves a list of all screening for a hall specified with hall id.

POST
http://localhost:3000/api/screenings/5fca38af9fe6c808e2cd4e77
http://localhost:3000/api/screenings/5fca38af9fe6c808e2cd4e77
Saves a new screening for a hall specified with hall id. Needs to specify values for keys 'film', 'beginning', 'end' in the request body.

Bodyurlencoded
film
film3
beginning
2020-12-5 10:00
end
2020-12-5 12:00
GET
http://localhost:3000/api/screening/5fcb51c9764c6e02f46bc3f1
http://localhost:3000/api/screening/5fcb51c9764c6e02f46bc3f1
Retrieves all data for screening specified with screening id.

PUT
http://localhost:3000/api/screening/5fcb51c9764c6e02f46bc3f1
http://localhost:3000/api/screening/5fcb51c9764c6e02f46bc3f1
Updates a screening specified with screening id. Needs to specify value for key 'name' in the request body. If body has a value (hall id) for key 'hall', which is different than the screening is assigned to, then the screening will be moved to specified hall.

Bodyurlencoded
hall
5fca38af9fe6c808e2cd4e77
film
film3
beginning
2020-12-05 10:00
end
2020-12-05 12:00
DEL
http://localhost:3000/api/screening/5fca87a81810f10d2801832a
http://localhost:3000/api/screening/5fca87a81810f10d2801832a
Deletes screening specified with screening id.