

export function authMiddleware(req:Request){
    const token = req.headers.get("authorization")


    //check for the vaidity. here i am just set validity to true

    // const len = token?.length || 0

    // if (len <= 0) {
    //     return false
    // }
    return !!token
}