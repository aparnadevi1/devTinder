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
-POST /request/send/interested/:userid
-POST /request/send/ignored/:userid
-POST /request/send/accepted/:requestid
-POST /request/send/rejected/:

## userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed-Gets you the profiles of other users on platform

