#evTinder APIs

##authRouter
-POST /signup
-POST /login
-POST /logout


## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password


## connectionRequestRouter
-POST /request/send/interested/:userid   //make status synamic for these two
-POST /request/send/ignored/:userid



-POST /request/send/accepted/:requestid
-POST /request/send/rejected/:requestid

## userRouter
-GET /user/connections
-GET /user/requests/received     //ref and populate
-GET /user/feed-Gets you the profiles of other users on platform

