export const adminMiddleware = async(req , res , next) => {
    try{
        console.log("user:" , req.user);
        const admin = req.user.isAdmin;
        if( !admin ){
            return res.status(401).json({message : "unauthorized"});
        }
        next();
    }
    catch(err){
        next(err);
    }
}